# Youssef El Amrani — portfolio

A responsive personal portfolio for Youssef El Amrani, an aspiring AI Engineer seeking a PFE internship. Built with React, TypeScript, Vite and Tailwind CSS from supplied educational demonstration content.

## Features

- Responsive mobile, tablet and desktop layouts with dark and light themes.
- Profile, experience, four AI projects, grouped technical skills, education, learning programs, languages and contact sections.
- Keyboard-accessible navigation, project disclosures, visible focus states and reduced-motion support.
- Optimized WebP portrait and self-hosted Inter fonts; no analytics, backend, API keys or external font requests.
- Production-browser tests with Playwright and automated accessibility checks with axe.

## Project structure

```text
src/App.tsx          Page sections and navigation
src/data.ts          Curated project and skill content
src/styles.css       Responsive layouts and theme styles
src/fonts.css        Self-hosted font declarations
src/assets/          Approved optimized portrait derivative
public/licenses/    Inter font license
tests/              Browser, accessibility and output privacy checks
```

## Run locally

Requires Node.js 22.13+ on the Node 22 line, or Node.js 24+. Verified locally with Node.js 22.19.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. The server binds only to 127.0.0.1.

```sh
npm run build
npm run lint
npm run format:check
npm run preview
npm test
```

The build command performs TypeScript checking and produces `dist/`. `npm test` rebuilds and tests that production output on loopback port 4173. Tests use Playwright with installed Google Chrome and axe; install Chrome if absent, or deliberately change the Playwright browser channel to a locally installed supported browser. Port 4173 must be free before running the suite.

The lint toolchain uses a minimatch override to the patched 11.0.1+ release to resolve GHSA-g3hv-75wg-m249. Lint, ignore behavior and build checks were validated with this override. Review its necessity when upgrading the lint toolchain.

## Content and privacy

- Content is curated in `src/data.ts` and `src/App.tsx` from supplied educational demo materials. No quantitative results or project links were supplied or invented.
- Social URLs are supplied demo addresses; account ownership is unverified. Links are not evidence of experience.
- The original CV, profile markdown, and portrait remain outside this application directory. Only a metadata-free optimized portrait derivative is included.
- No CV download is enabled. A separately approved sanitized copy is required.
- Original inputs, common secret files, dependencies, generated builds, browser captures and internal review reports are excluded through `.gitignore`. These rules are an additional safeguard; review the staged file list before every publication.
- Never copy private documents or secrets into `public/`, `src/`, Git history, or `dist/`.
- Review all public copy, contact information and portrait permissions before publication. Inspect the exact Git file list and build output, not only ignore rules.
- GitHub repository creation, pushes, PRs, settings changes, Render services, public deployment, auto-deployment and paid actions each require separate explicit approval.

## Design and behavior

Responsive one-page design, semantic sections, native project disclosures, mobile navigation, keyboard focus, reduced-motion support and persistent dark/light theme. Fonts are self-hosted through the Inter npm package, including its bundled license. Project workflow visuals are conceptual diagrams, not screenshots or performance evidence.

`npm run build` is the type check and production verification command. Browser tests cover navigation, theme persistence, disclosures, supplied links, responsive overflow and automated accessibility in both themes. Manual screen-reader and cross-browser review remain useful before publication.

## Publication status and licensing

### Prepared GitHub Pages deployment

The `.github/workflows/pages.yml` workflow builds the app with the project-site base `/youssef-el-amrani-portfolio/` and uploads only `dist`. It runs manually through **Actions → Deploy portfolio to GitHub Pages → Run workflow**; pushes do not deploy automatically. GitHub Pages must first be configured to use GitHub Actions. Pushing this configuration does not enable Pages or run a deployment; those operations require separate explicit approval.

The proposed URL is `https://bakirmohammed1234.github.io/youssef-el-amrani-portfolio/`. It is not verified live. The existing `Myportfolio-website` site is a separate project.

No deployed URL is claimed by this README. Hosting and automatic deployment require separate approval.

Inter is distributed under the SIL Open Font License; its license is retained in `public/licenses/Inter-OFL.txt`. No license for the application code or portrait has been granted by this project. The educational demo designation does not establish permission to reuse the portrait or personal content.
