# Project status and handoff

Last updated: 2026-09-30. Update this file whenever work lands or priorities
change; `AGENTS.md` holds the stable conventions, this file holds the moving
state.

## Where things stand

The landing page is built, responsive and production-ready apart from the
pending items below. `pnpm check`, `pnpm typecheck` and `pnpm build` all pass.

**Nothing is committed yet.** The repo has `git init` and no commits. The owner
has not asked for a commit; ask before creating one. Do not commit on `main`
without being told to.

### History, in order

1. Scaffolded from `create-vinext-app` (vinext on Cloudflare Workers),
   restructured to `src/` following the `titus` project.
2. Built as a layout study of a portfolio site, then reworked into the Signum
   Industrial AI site using the copy, palette, wordmark, favicon and three
   images from the team's existing site
   (`https://signet-industrial-robotics.harry05.chatgpt.site/`).
3. Owner review rounds: fixed hover-state bugs, contrast, text sizes, hero
   flicker, clipped descenders; added country flags; removed the hero
   coordinates; logo descriptor on one line and optically centred.
4. SEO and hardening: metadata, Open Graph image, robots, sitemap, manifest,
   JSON-LD, strict CSP and security headers, explicit image dimensions and
   responsive variants.
5. Performance refactor: sections became server components, scroll effects moved
   to CSS scroll-driven animations, motion reduced to interactive islands via
   `LazyMotion`.
6. Converted from vinext + Cloudflare Workers to plain Next.js for Vercel.
   `src/proxy.ts`, `vite.config.ts`, `cloudflare.config.ts` and
   `public/_headers` were removed; all headers now live in `next.config.ts`.

### Lighthouse (measured on the vinext build; re-measure on Next.js)

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 89 to 91 | 100 | 100 | 100 |

Mobile performance will not reach 100 on this stack. A bare page with only a
heading scores 96 to 97, because Lighthouse's simulated slow 4G counts the
React and framework runtime against the first large paint. The remaining gap on
the home page is mostly the framework's hydration payload in the HTML (about
170 KB uncompressed, 18 KB compressed). The real first paint is about 0.24s.
Do not spend more time chasing 100 unless the owner asks; they have been told
the ceiling.

How to measure:

```bash
pnpm build && pnpm start          # terminal 1 (port 4173)
pnpm lighthouse:proxy             # terminal 2 (port 4174, Brotli)
pnpm dlx lighthouse@12 http://localhost:4174 --chrome-flags="--headless=new"
pnpm dlx lighthouse@12 http://localhost:4174 --preset=desktop --chrome-flags="--headless=new"
```

## Pending

1. **New images.** Ten slots still reuse the three 960x720 source images, which
   look soft in full-width positions on large screens. Prompts and the exact
   workflow are in `docs/image-prompts.md`; slots are marked `TODO` in
   `src/config/images.ts`. The owner generates the images; wiring them in is:
   drop into `public/images/src/`, run `pnpm images`, update `images.ts`.
2. **Deploy and domain.** Not deployed yet. Import the project in Vercel
   (framework preset Next.js; pnpm is detected from the lockfile), set
   `NEXT_PUBLIC_SITE_URL=https://signumindustrial.ai`, and add the domain in
   the project's domain settings. After the first deploy, confirm the CSP header is present on `/` and that
   `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` and `/og.jpg` resolve.
3. **Initial commit**, when the owner asks for it.
4. **Owner checks still open**
   - Confirm the hero "glitch" is gone on their machine (three causes were
     removed; it could not be reproduced here).
   - Hard-reload if an old tab still shows a dash in the page title.
5. **Nice to have, not requested**
   - Apple touch icon / PNG icons for the manifest (only `favicon.svg` exists).
   - Replace `src/app/api/hello` (scaffold leftover) or remove it.
   - A contact form instead of `mailto:` links.
   - Firefox: scroll-driven animations are not supported yet, so it shows the
     static state; revisit when Firefox ships `animation-timeline`.

## Owner preferences learned so far

- Tailwind classes over hand-written CSS.
- motion.dev for animation, Hugeicons for icons, `titus` as the structure guide.
- No em dashes anywhere.
- Text must not be tiny; strong contrast; optimised for all screen sizes.
- Wants real verification (use the site in the browser, run Lighthouse), not
  assumptions.
- Asks for a zip of the project without `node_modules` after milestones. Build
  it from the parent folder with:
  `tar.exe -a -c -f signum.zip --exclude=node_modules --exclude=.vercel --exclude=.git --exclude=.next --exclude=*.tsbuildinfo signum`

## Known local state

- The owner often has their own `pnpm dev` running on port 5173. Next allows
  one dev server per project directory, so use `pnpm start` (4173) for checks and do not
  kill their process without asking.
