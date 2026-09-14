# Adopt in foghorn's www

Repo: `foghornid/foghorn` — the service repo (Go binary, `console/`,
`infra/`). There is no site today. The domain's zone is in Cloudflare
and managed by `infra/cloudflare` (applied 2026-09-14: the zone,
null-mail SPF/DMARC, `app.`/`hooks.` behind `dns_enabled`); the apex
and `www.` are unmapped. The product is not built yet — the site
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
- `infra/cloudflare/foghorn.tf` gains, on the latchkey shape:
  ```hcl
  resource "cloudflare_pages_project" "www" {
    account_id        = var.account_id
    name              = "foghorn-www"
    production_branch = "main"
    lifecycle { ignore_changes = [build_config, deployment_configs] }
  }
  resource "cloudflare_pages_domain" "www" {
    for_each     = toset(["foghorn.id", "www.foghorn.id"])
    account_id   = var.account_id
    project_name = cloudflare_pages_project.www.name
    name         = each.key
  }
  # Apex CNAME works via Cloudflare's flattening.
  resource "cloudflare_dns_record" "www_site" {
    for_each = toset(["foghorn.id", "www.foghorn.id"])
    zone_id  = cloudflare_zone.this.id
    name     = each.key
    type     = "CNAME"
    content  = "foghorn-www.pages.dev"
    proxied  = true
    ttl      = 1
  }
  ```
  The token in `TF_VAR_cloudflare_api_token` needs Account > Cloudflare
  Pages > Edit as well as DNS. Leave the apply to Chris (local state);
  include the plan output in the PR.
- `.github/workflows/www.yml`: on push to main with `paths: [www/**]`
  (and `workflow_dispatch`), `npm ci && npm run build` in `www/`, then
  `npx wrangler pages deploy dist --project-name foghorn-www --branch=main`
  with `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets
  (values from `latchkeyid/ui`). Keep `ci.yml` and `deploy.yml` as
  they are; add `www/` to `ci.yml`'s job as a build step so a broken
  site fails PR CI.
- `.gitignore` already ignores `/console/node_modules` etc.; add
  `/www/node_modules/`, `/www/dist/`, `/www/.astro/`.
- README: add a "Site" line under Layout pointing at `www/`.
