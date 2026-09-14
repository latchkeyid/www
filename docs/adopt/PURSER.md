# Adopt in purser's www

Repo: `purserid/purser` — the service repo (Go binary, `console/`,
`infra/`). There is no site today. The domain's zone is in Cloudflare
and managed by `infra/cloudflare` (the zone, null-mail SPF/DMARC,
`api.`/`hooks.` behind `dns_enabled`, and the Pages projects for the
console and this site). The product is not built yet — the site
describes what `DESIGN.md` says it is, in the future-honest tense the
README uses ("Purser is …", never "available now").

- The site lives at `www/` in this repo (the service's things stay
  together: `console/`, `www/`, `infra/`). `npx degit
  latchkeyid/www/template www`. Product id `purser`; accent
  `purser.css` (the console shell's, verbatim); `site: "https://purser.id"`.
- Copy from `README.md` and `DESIGN.md`: the customer record: support tickets by email, contacts and companies, leads and the pipeline. Hero headline
  suggestion: "Every customer, *one* record." — the purser keeps the manifest. Features = the "What it owns" / "The rules"
  lists. Steps = onboarding a product (three steps from DESIGN.md).
  The hero visual: a `Terminal` of the onboarding: an MX record, a workspace row, the first ticket arriving — from DESIGN.md §3 ('zero SDK work in the product'). No pricing page. No stats row. Changelog: one
  entry, "Designed", dated 2026-09-14, linking DESIGN.md.
- Docs: one page, "Design", that is DESIGN.md rendered (copy it into
  `src/content/docs/design.mdx` with the heading levels shifted so the
  page has one h1) — the design is the documentation until the product
  exists. Nav: Product, Docs, Changelog. Secondary "Sign in" → `https://app.purser.id` is the
  house default; **omit it and the primary Console button until the
  console is deployed** (`cta: null` and no `secondary` in `site.ts` —
  an empty nav right side is fine).
- **Cloudflare is already done** (2026-09-15): `infra/cloudflare/pages.tf`
  holds the `purser-www` Pages project, the apex + `www.` domains and
  the proxied CNAMEs (and the console's). Apply is Chris's (local
  state); nothing for the adopter to add there.
- `.github/workflows/www.yml`: copy `console.yml` (already in the repo)
  with `console/` → `www/` and the project `purser-www`; same secrets. Keep `ci.yml` and `deploy.yml` as
  they are; add `www/` to `ci.yml`'s job as a build step so a broken
  site fails PR CI.
- `.gitignore` already ignores `/console/node_modules` etc.; add
  `/www/node_modules/`, `/www/dist/`, `/www/.astro/`.
- README: add a "Site" line under Layout pointing at `www/`.
