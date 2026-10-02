# wathsara.me

Personal portfolio. Vite, React 19, TypeScript and Tailwind, deployed to GitHub Pages.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run lint` | Oxlint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | Browser smoke tests (Playwright); run `npm run build` first |

## Editing content

All content lives in `src/data/defaults.json`. Edit it directly, or open `/admin` on the site:
changes save as a draft in your browser, and with a fine-grained GitHub token
(Contents: read and write on this repo) "Save & deploy" commits the file to `main`.

## Layout

- `src/styles/tokens.css` holds every colour, font, spacing and motion value.
- `src/lib/sections.ts` is the single list of page sections used by the nav and footer.
- `src/components/sections/` has one file per page section.
- `src/pages/admin/` is the content editor, loaded only on `/admin`.

## Deploying

Pushing to `main` runs lint, type check, tests and the build, then publishes `dist/` to the `gh-pages` branch.
