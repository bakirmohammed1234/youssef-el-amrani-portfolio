import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

for (const width of [375, 768, 1440]) {
  test(`production assets, layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    const failures: string[] = [],
      requests: string[] = [];
    page.on("request", (r) => requests.push(r.url()));
    page.on("requestfailed", (r) => failures.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400) failures.push(r.url());
    });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("img")).toHaveCount(1);
    expect(
      await page
        .locator("img")
        .evaluate((image) => image.complete && image.naturalWidth === 494),
    ).toBe(true);
    for (const theme of ["dark", "light"]) {
      if (theme === "light")
        await page
          .getByRole("button", { name: "Switch to light theme" })
          .click();
      await page.emulateMedia({ reducedMotion: "reduce" });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags([
              "wcag2a",
              "wcag2aa",
              "wcag21a",
              "wcag21aa",
              "wcag22a",
              "wcag22aa",
            ])
            .analyze()
        ).violations,
      ).toEqual([]);
      const label = await page.locator(".label-top").boundingBox();
      const visual = await page.locator(".hero-visual").boundingBox();
      expect(label!.x).toBeGreaterThanOrEqual(0);
      expect(label!.x + label!.width).toBeLessThanOrEqual(width);
      expect(label!.x).toBeGreaterThanOrEqual(visual!.x);
      expect(label!.x + label!.width).toBeLessThanOrEqual(
        visual!.x + visual!.width,
      );
      await page.screenshot({
        path: `test-results/${width}-${theme}.png`,
        fullPage: true,
      });
      await page
        .locator(".hero")
        .screenshot({ path: `test-results/hero-${width}-${theme}.png` });
    }
    expect(failures).toEqual([]);
    expect(
      requests.every(
        (url) =>
          url.startsWith("http://127.0.0.1:4173/") || url.startsWith("data:"),
      ),
    ).toBe(true);
  });
}

test("keyboard skip link, mobile menu and project disclosures", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About", exact: true }),
  ).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#about")).toBeFocused();
  await page.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(
    page.locator("details").first().locator(".project-details"),
  ).toBeVisible();
});

test("anchor destinations and public output privacy", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const anchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")!.slice(1)),
    );
  for (const id of new Set(anchors))
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  await expect(page.locator('a[href="tel:+212633556612"]')).toHaveCount(1);
  for (const link of await page.locator('a[target="_blank"]').all())
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  function files(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? files(join(directory, entry.name))
        : [join(directory, entry.name)],
    );
  }
  const output = files("dist");
  expect(
    output.every((file) => /\.(html|css|js|woff2|webp|txt)$/.test(file)),
  ).toBe(true);
  expect(
    output.some((file) =>
      /(?:profile\.md|\.pdf|\.env|README|QA-REPORT|TEST-REPORT|\.map|photo\.jpg)/i.test(
        file,
      ),
    ),
  ).toBe(false);
  for (const file of output.filter((file) => /\.(html|css|js|txt)$/.test(file)))
    expect(readFileSync(file, "utf8")).not.toMatch(
      /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9_-]{30,}|AKIA[0-9A-Z]{16}/,
    );
  for (const path of [
    "/documents/profile.md",
    "/documents/Youssef_El_Amrani_AI_Engineer_CV.pdf",
    "/.env",
    "/src/App.tsx",
    "/QA-REPORT.md",
    "/TEST-REPORT.md",
    "/vite.config.ts",
  ]) {
    const response = await request.get(path);
    // SPA fallback may return index.html, but must never serve the requested source material.
    if (response.status() === 200)
      expect(await response.text()).toBe(
        readFileSync("dist/index.html", "utf8"),
      );
    else expect([403, 404]).toContain(response.status());
  }
});
