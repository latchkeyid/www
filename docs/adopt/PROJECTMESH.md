# Adopt in Project Mesh's www

Repo: `projectmesh-io/mesh-marketing` — four hand-written HTML pages
(`index`, `features`, `pricing`, `docs`) on Tailwind's CDN build, dark
only, blue `#2563EB` → cyan `#06B6D4` with a grid background and a hero
glow. Deployed by `.github/workflows/deploy.yml` (`wrangler-action`,
`pages deploy .` to the Pages project `mesh-marketing`; secrets already
in the repo). The `projectmesh.io` zone is in Cloudflare with DNS
managed in the dashboard — **there is no infra repo; leave DNS and the
Pages project as they are.**

- Replace the repo's contents with the template. Product id
  `projectmesh`; accent `projectmesh.css` (blue → cyan, from the old
  site's variables); `site: "https://projectmesh.io"`. The old site was
  dark-only; the new one follows the system — its dark mode is where
  the old look lands, so **set `defaultTheme: "dark"`** on `Site` for
  this product only.
- Copy: the old `index.html`'s hero ("The intelligence layer for your AI
  fleet") and feature copy, `features.html` → `Features`/`Bento`,
  `pricing.html` → `Pricing` with the **real** tiers from that page,
  `docs.html` → one or more `src/content/docs/` pages by its headings.
  Hero visual: a `Terminal` of `mesh-cli` (see `projectmesh-io/mesh-cli`
  README for its real first commands: authenticate, list specs, open a
  work item) — not a screenshot of the old grid art.
- Nav: Product, Pricing, Docs, Changelog; secondary "Sign in" and
  primary "Console" → `https://app.projectmesh.io` (from `house.ts`).
  Changelog: seed from `mesh-portal` / `mesh-api` recent releases.
- `deploy.yml`: add `setup-node`, `npm ci`, `npm run build`, and change
  the command to `pages deploy dist --project-name=mesh-marketing`.
- Delete the four HTML files when the port is complete.
