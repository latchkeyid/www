# Adopt in tripline's www

Repo: `triplineid/tripline` (Go binary, `console/`, `infra/`). No site
today. `tripline.id`'s zone is Terraform in `infra/cloudflare`, but the
**apex A and `www` CNAME are Namecheap parking records the zone was
imported with and are "not managed here"** (see the comment in
`tripline.tf`) — the site takeover removes them and manages the apex.

- Site at `www/`; product id `tripline`; accent `tripline.css`; `site:
  "https://tripline.id"`.
- Copy from `README.md`: the in-house Sentry — stock Sentry SDKs and
  `sentry-cli`, issues/regressions/spikes, alert rules (email, signed
  webhook), performance (transactions, vitals), DSN keys as latchkey
  publishable keys, tenants and signup. Hero headline suggestion:
  "Every error, *yours*." Hero visual: the `Terminal` from the README's
  "Post an envelope the way an SDK would" (`printf … | curl …` →
  `{"id":"…"}`), or a `Window` of the issues list. Steps: create a
  project, install the SDK with the DSN, see the first issue. No
  pricing. Docs: "Protocol surface" (the README's endpoint table) and
  "Alerts" (the CLI `-alert-rule` examples) as two MDX pages. Changelog:
  the last three commits on main that a user would notice.
- Nav: Product, Docs, Changelog; secondary "Sign in" and primary
  "Console" → `https://app.tripline.id` (live).
- `infra/cloudflare/tripline.tf`: add the Pages project, the two
  `cloudflare_pages_domain`s and the proxied CNAMEs exactly as in
  `FOGHORN.md`, using `var.zone_id` (this stack takes the zone id as a
  variable, not a resource). Before apply, delete the Namecheap parking
  apex A and `www` CNAME in the dashboard or import them into state and
  let the plan replace them — Chris's call; say which in the PR.
- Workflow `www.yml` as in `FOGHORN.md`; add `www/` build to `ci.yml`.
