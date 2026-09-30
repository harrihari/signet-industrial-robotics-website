# Signum Industrial AI

Marketing site for Signum Industrial AI, served at
[signumindustrial.ai](https://signumindustrial.ai). Built with Next.js (App Router)
and deployed to Vercel.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (`.next/`) |
| `pnpm start` | Serve the production build locally on port 4173 |
| `pnpm check` / `pnpm check:write` | Biome lint and format (check / fix) |
| `pnpm typecheck` | TypeScript check |
| `pnpm images` | Regenerate responsive image variants and `public/og.jpg` |
| `pnpm lighthouse:proxy` | Brotli proxy on port 4174 for realistic Lighthouse runs |

## Editing content

All copy, links and image references live in `src/config/`:

- `site.ts`: name, domain, title, contact details, navigation
- `content.ts`: section copy
- `services.ts`: the three service cards and five capabilities
- `images.ts`: every image slot

To add or replace an image, put the source file in `public/images/src/`, run
`pnpm images`, then point the slot in `images.ts` at it. Prompts for the images
still to be produced are in `docs/image-prompts.md`.

## Configuration

Copy `.env.example` to `.env` to override the canonical origin
(`NEXT_PUBLIC_SITE_URL`). It defaults to `https://signumindustrial.ai`.

## More

- `AGENTS.md`: architecture, conventions and gotchas
- `docs/STATUS.md`: current state and pending work
