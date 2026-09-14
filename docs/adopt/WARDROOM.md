# Adopt in wardroom's www

Repo: `wardroomid/wardroom` — the service repo (Go binary, `console/`,
`infra/`). There is no site today. The domain's zone is in Cloudflare
and managed by `infra/cloudflare` (the zone, null-mail SPF/DMARC,
`api.`/`hooks.` behind `dns_enabled`, and the Pages projects for the
console and this site). The product is not built yet — the site
describes what `DESIGN.md` says it is, in the future-honest tense the
README uses ("Wardroom is …", never "available now").

- The site lives at `www/` in this repo (the service's things stay
  together: `console/`, `www/`, `infra/`). `npx degit
  latchkeyid/www/template www`. Product id `wardroom`; accent
  `wardroom.css` (the console shell's, verbatim); `site: "https://wardroom.id"`.
- Copy from `README.md` and `DESIGN.md`: the team hub: a space per org, channels as feeds of typed threads from GitHub, purser, tripline and runsheet. Hero headline
  suggestion: "Where the *crew* gathers." — the officers' mess. Features = the "What it owns" / "The rules"
  lists. Steps = onboarding a product (three steps from DESIGN.md).
  The hero visual: a `Window` of a channel: a PR thread, a ticket thread and an alert thread stacked, from DESIGN.md's connectors table. No pricing page. No stats row. Changelog: one
  entry, "Designed", dated 2026-09-14, linking DESIGN.md.
- Docs: one page, "Design", that is DESIGN.md rendered (copy it into
  `src/content/docs/design.mdx` with the heading levels shifted so the
  page has one h1) — the design is the documentation until the product
  exists. Nav: Product, Docs, Changelog. Secondary "Sign in" → `https://app.wardroom.id` is the
  house default; **omit it and the primary Console button until the
  console is deployed** (`cta: null` and no `secondary` in `site.ts` —
  an empty nav right side is fine).
- **Cloudflare is already done** (2026-09-15): `infra/cloudflare/pages.tf`
  holds the `wardroom-www` Pages project, the apex + `www.` domains and
  the proxied CNAMEs (and the console's). Apply is Chris's (local
  state); nothing for the adopter to add there.
- `.github/workflows/www.yml`: copy `console.yml` (already in the repo)
  with `console/` → `www/` and the project `wardroom-www`; same secrets. Keep `ci.yml` and `deploy.yml` as
  they are; add `www/` to `ci.yml`'s job as a build step so a broken
  site fails PR CI.
- `.gitignore` already ignores `/console/node_modules` etc.; add
  `/www/node_modules/`, `/www/dist/`, `/www/.astro/`.
- README: add a "Site" line under Layout pointing at `www/`.
