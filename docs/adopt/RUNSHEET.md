# Adopt in runsheet's www

Repo: `runsheet/website` — already Astro (`@astrojs/cloudflare` adapter,
`@tailwindcss/vite`, `wrangler.jsonc`), a hand-rolled slate/indigo look
in `src/layouts/Site.astro` and `src/styles/global.css`, pages `/`,
`/terrastore`, `/prologue`, `/getting-started`, `/contact`. Real content
that stays.

- This is a layout swap, not a rebuild: add the package, replace
  `src/styles/global.css` with the four-line version (accent
  `runsheet.css`), replace `src/layouts/Site.astro` with the template's
  thin wrapper + `src/site.ts` (product `runsheet`, links Terrastore /
  Prologue / Getting started / Contact, primary "Console" →
  `https://console.runsheet.dev`), and rebuild each page on the shell's
  components: the home hero (headline "Tooling for teams that ship on
  *GitHub*."), the two product cards → `Features` (2 columns) or a
  `Bento` with the "Live" badge as `Badge tone="success"`, product pages
  → `Section` + `Steps`/`Features`, getting-started → a `Docs` page (move
  it to `src/content/docs/`), contact → keep, on `.prose`.
- Keep the Cloudflare adapter only if a page renders per request; if
  every page is `prerender = true` (it is today), switch to static
  output and `wrangler pages deploy dist` — check `wrangler.jsonc` for
  the project name and keep it.
- Chippy (the deploy product) gets a section on the home page from
  `runsheet/chippy`'s README, under the runsheet accent; no separate
  site.
- Delete the old `global.css` and `Site.astro` when nothing references
  them.
