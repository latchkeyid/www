# Adopt in foghorn's www

Repo: `foghornid/foghorn` — the service repo (Go binary, `console/`,
`infra/`). There is no site today. The domain's zone is in Cloudflare
and managed by `infra/cloudflare` (the zone, null-mail SPF/DMARC,
`api.`/`hooks.` behind `dns_enabled`, and the Pages projects for the
console and this site). The product is not built yet — the site
describes what `DESIGN.md` says it is, in the future-honest tense the
README uses ("Foghorn is …", never "available now").

- The site lives at `www/` in this repo (the service's things stay
  together: `console/`, `www/`, `infra/`). `npx degit
  latchkeyid/www/template www`. Product id `foghorn`; accent
  `foghorn.css` (the console shell's, verbatim); `site: "https://foghorn.id"`.
- Copy from `README.md` and `DESIGN.md`: outbound marketing: campaigns, tracked links, email broadcasts and sequences, social plan-and-track, attribution over PostHog + purser. Hero headline
  suggestion: "Say it once, *everyone* hears." — or better; the README calls it loud, one direction. Features = the "What it owns" / "The rules"
  lists. Steps = onboarding a product (three steps from DESIGN.md).
  The hero visual: a `Window` showing a campaign report: reach → engagement → conversion → revenue as a four-column table, from DESIGN.md's CampaignReport. No pricing page. No stats row. Changelog: one
  entry, "Designed", dated 2026-09-14, linking DESIGN.md.
- Docs: one page, "Design", that is DESIGN.md rendered (copy it into
  `src/content/docs/design.mdx` with the heading levels shifted so the
  page has one h1) — the design is the documentation until the product
  exists. Nav: Product, Docs, Changelog. Secondary "Sign in" → `https://app.foghorn.id` is the
  house default; **omit it and the primary Console button until the
  console is deployed** (`cta: null` and no `secondary` in `site.ts` —
  an empty nav right side is fine).
- **Cloudflare is already done** (2026-09-15): `infra/cloudflare/pages.tf`
  holds the `foghorn-www` Pages project, the apex + `www.` domains and
  the proxied CNAMEs (and the console's). Apply is Chris's (local
  state); nothing for the adopter to add there.
- `.github/workflows/www.yml`: copy `console.yml` (already in the repo)
  with `console/` → `www/` and the project `foghorn-www`; same secrets. Keep `ci.yml` and `deploy.yml` as
  they are; add `www/` to `ci.yml`'s job as a build step so a broken
  site fails PR CI.
- `.gitignore` already ignores `/console/node_modules` etc.; add
  `/www/node_modules/`, `/www/dist/`, `/www/.astro/`.
- README: add a "Site" line under Layout pointing at `www/`.
