import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("content, disclosures, contact links and privacy boundaries", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Building practical",
  );
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(
    page.locator('a[href="mailto:youse.elamrrani@gmail.com"]'),
  ).toHaveCount(2);
  await expect(
    page.locator('a[href="https://github.com/youssef"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('a[href="https://linkedin.com/in/youssef"]'),
  ).toHaveCount(1);
  await expect(page.locator('a[download], a[href$=".pdf"]')).toHaveCount(0);
  await page.getByRole("link", { name: "Explore my projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  expect(errors).toEqual([]);
});

test("theme persists and both themes pass automated accessibility checks", async ({
  page,
}) => {
  await page.goto("/");
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const results = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("responsive layouts and keyboard mobile navigation", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});

test("capture desktop and mobile review images", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.screenshot({
    path: "test-results/light-mobile.png",
    fullPage: true,
  });
});
