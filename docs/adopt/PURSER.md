# Adopt in purser's www

Repo: `purserid/purser` — the service repo (Go binary, `console/`,
`infra/`). There is no site today. The domain's zone is in Cloudflare
and managed by `infra/cloudflare` (applied 2026-09-14: the zone,
null-mail SPF/DMARC, `app.`/`hooks.` behind `dns_enabled`); the apex
and `www.` are unmapped. The product is not built yet — the site
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
- `infra/cloudflare/purser.tf` gains, on the latchkey shape:
  ```hcl
  resource "cloudflare_pages_project" "www" {
    account_id        = var.account_id
    name              = "purser-www"
    production_branch = "main"
    lifecycle { ignore_changes = [build_config, deployment_configs] }
  }
  resource "cloudflare_pages_domain" "www" {
    for_each     = toset(["purser.id", "www.purser.id"])
    account_id   = var.account_id
    project_name = cloudflare_pages_project.www.name
    name         = each.key
  }
  # Apex CNAME works via Cloudflare's flattening.
  resource "cloudflare_dns_record" "www_site" {
    for_each = toset(["purser.id", "www.purser.id"])
    zone_id  = cloudflare_zone.this.id
    name     = each.key
    type     = "CNAME"
    content  = "purser-www.pages.dev"
    proxied  = true
    ttl      = 1
  }
  ```
  The token in `TF_VAR_cloudflare_api_token` needs Account > Cloudflare
  Pages > Edit as well as DNS. Leave the apply to Chris (local state);
  include the plan output in the PR.
- `.github/workflows/www.yml`: on push to main with `paths: [www/**]`
  (and `workflow_dispatch`), `npm ci && npm run build` in `www/`, then
  `npx wrangler pages deploy dist --project-name purser-www --branch=main`
  with `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets
  (values from `latchkeyid/ui`). Keep `ci.yml` and `deploy.yml` as
  they are; add `www/` to `ci.yml`'s job as a build step so a broken
  site fails PR CI.
- `.gitignore` already ignores `/console/node_modules` etc.; add
  `/www/node_modules/`, `/www/dist/`, `/www/.astro/`.
- README: add a "Site" line under Layout pointing at `www/`.
