# AGENTS.md

Guidance for AI coding agents working in this repository.
Read `docs/STATUS.md` first: it says what is done, what is pending, and where to
pick up.

## Project

Marketing site for **Signum Industrial AI** (subsea services, industrial
robotics, AI-native platforms). Single landing page, statically prerendered.

- Production domain: **signumindustrial.ai** (`siteConfig.domain` in
  `src/config/site.ts`; override the origin with `NEXT_PUBLIC_SITE_URL`).
- Stack: **Next.js 16** (App Router) on **Vercel**,
  React 19, TypeScript, Tailwind CSS 4, motion (motion.dev), Lenis, Hugeicons,
  Biome. Package manager: **pnpm**.
- The owner's other project `C:\Users\hydra\Developer\personal\titus` is the
  reference for codebase structure and conventions.

## Commands

```bash
pnpm dev               # Next dev server, port 5173
pnpm build             # production build into .next/
pnpm start             # serve the production build (next start), port 4173
pnpm check             # Biome lint + format check
pnpm check:write       # Biome with auto-fix (run before finishing any change)
pnpm typecheck         # tsc --noEmit
pnpm images            # regenerate image variants + public/og.jpg (sharp)
pnpm lighthouse:proxy  # Brotli proxy :4174 -> :4173 for realistic Lighthouse runs
```

Verification for any change: `pnpm check:write`, `pnpm typecheck`, `pnpm build`.
There is no test suite.

## Architecture

```
src/
  app/            layout.tsx, page.tsx, robots.ts, sitemap.ts, manifest.ts, api/hello
  config/         ALL content and settings (edit copy here, not in components)
    site.ts         name, domain, title, contact, nav links
    content.ts      section copy (about, services intro, metrology, experience, delivery, contact)
    services.ts     pillars (3 cards) and capabilities (5 rows)
    images.ts       every image slot -> { src, srcSet, width, height }
    security.ts     CSP and security headers (applied in next.config.ts)
  components/
    layout/         header.tsx (client), footer.tsx (server)
    sections/       landing.tsx composes the page; home/* is one file per section
    shared/         reusable pieces (logo, pill-button, reveal, split-text, tag, ...)
    providers/      Lenis smooth scroll + LazyMotion + MotionConfig (client)
  lib/utils/      cn(), getBaseUrl(), metadata.ts (SEO + JSON-LD), motion.ts (easings)
  styles/         globals.css: Tailwind theme tokens, keyframes, scroll-driven utilities
  types/          shared types
scripts/          optimize-images.mjs, br-proxy.mjs
docs/             STATUS.md (handoff), image-prompts.md (prompts for pending images)
public/           favicon.svg, og.jpg, flags/, images/ (variants), images/src/ (sources)
```

Page order (`sections/landing.tsx`): Header, Hero, Intro, Pillars (sideways card
track), Capabilities, Showcase, Metrology (`#metrology`), Experience
(`#experience`), Delivery (`#approach`), Footer (`#contact`).

## Conventions

**Server components by default.** Only these are client components: `header`,
`providers`, `capability-preview`, `count-up`, `magnetic`, `back-to-top`. Do not
add `"use client"` to a section; extract a small client island instead.

**Animation split**
- Scroll effects (reveals, word-by-word headings, parallax, circular reveal, the
  sideways card track) are **CSS scroll-driven animations** defined as `@utility`
  classes in `globals.css` (`scroll-reveal`, `scroll-rise`, `scroll-parallax`,
  `scroll-track`, ...). They sit behind `@supports (animation-timeline: view())`
  and `prefers-reduced-motion`, so unsupported browsers (Firefox today) get the
  static final state; the card track falls back to a swipeable row.
- Hero entrance is CSS keyframes (`animate-rise`, `animate-fade-up`) so it paints
  before hydration. The hero has **no scroll-linked motion** on purpose: it
  jittered against smooth scrolling.
- Interactive motion uses **motion.dev**, and only via `m.*` components
  (`import { m } from "motion/react"`). `LazyMotion` runs in `strict` mode, so a
  full `motion.*` component throws. Do not reintroduce `motion.div`.
- Lenis is driven from motion's frame loop (`providers/index.tsx`); keep
  `autoRaf: false`.

**Styling**
- Tailwind utilities over custom CSS. Custom CSS is limited to theme tokens,
  keyframes and the scroll utilities in `globals.css`.
- Tabs, double quotes, sorted classes (Biome). Always merge classes with `cn()`.
- Colour tokens and where they are safe to use:
  - `ink` / `ink-deep`: dark surfaces, and text on light.
  - `accent` (#c74925): fills only (white text on it passes).
  - `accent-ink`: accent-coloured **text on light** surfaces.
  - `accent-light`: accent-coloured **text on dark** surfaces.
  - `muted`: secondary text on light. `mist`: secondary text on dark.
  - Do not use `text-accent` for text; it fails contrast on the soft grey.
- Minimum text size is 12px (`text-xs`); body copy 16px and up.
- Hover groups are **named**: `group/pill` (PillButton), `group/roll`
  (RollText). A bare `group` on a card must never trigger a child's hover state.
- Icons: `HugeiconsIcon` from `@hugeicons/react` with icons from
  `@hugeicons/core-free-icons`.

**Images**
- Every `<img>` spreads a `Picture` from `config/images.ts` (gives `src`,
  `srcSet`, `width`, `height`) and sets `sizes`. Below-the-fold images use
  `loading="lazy"`; nothing uses `fetchPriority="high"` (the LCP element is text).
- Put sources in `public/images/src/`, run `pnpm images`, then reference the
  generated widths with `responsive(name, widths, aspect)` in `images.ts`.

**Accessibility**
- Split/animated text renders an `sr-only` copy and hides the visual spans with
  `aria-hidden`. Do not put `aria-label` on plain `<span>`/`<div>`.
- If a control has visible text, do not give it an `aria-label` that differs
  from that text.
- Decorative low-contrast glyphs are rendered via `::before` (see the step
  numerals in `metrology.tsx`).

**Writing**
- **No em dashes anywhere** (copy, comments, docs, metadata). Use a colon,
  semicolon, comma, period or `|`.
- Site copy comes from the Signum team's own site; do not invent claims or
  numbers. Keep new copy consistent with `config/content.ts`.

**Headline mask**: animated lines clip with `overflow-hidden`; keep the
`-mb-[0.25em] pb-[0.25em]` pair so descenders (g, p, y) are not cut off.

## Security headers and CSP

`src/config/security.ts` defines a strict CSP with **no `unsafe-eval`**. It is
applied in production only (the dev server needs eval for HMR) via
`next.config.ts` `headers()`, which also covers prerendered pages and sets
long-lived `Cache-Control` for `/images/*` and `/flags/*`. There is no
middleware on purpose: it would add a function invocation to every request on
Vercel.

Preview deployments (`VERCEL_ENV=preview`) also allow the Vercel toolbar's
origins (`vercel.live`, `vercel.com`, `assets.vercel.com`, Pusher websocket);
production builds do not.

`script-src` and `style-src` need `'unsafe-inline'` (framework bootstrap scripts,
JSON-LD, motion inline styles). Never add `eval`/`new Function` or a dependency
that needs them.

## Gotchas

- **One dev server per project.** Next refuses to start a second `pnpm dev`.
  If port 5173 is taken, it is probably the owner's own server; do not kill it
  without asking. Use `pnpm start` on 4173 to check
  production output.
- **Stop `pnpm start` before `pnpm build`** (both use `.next/`), then start it
  again.
- `next start` only gzips; Vercel's edge serves Brotli. For Lighthouse, run
  `pnpm lighthouse:proxy` and audit `http://localhost:4174` so results match
  production more closely.
- The CSP includes `upgrade-insecure-requests`, so `fetch()` from the page on
  plain-http `localhost:4173` fails. Check headers with `curl` instead.
- Screenshots and `requestAnimationFrame` stall when the browser pane is hidden;
  a stuck animation in a hidden pane is not a bug.
- `sed` on this machine mangles `\u` escapes. Use the Edit tool for those.
- Windows + Git Bash: there is no `python`; use `node`/`perl`. Zip with
  `C:\Windows\System32\tar.exe -a -c -f`.
