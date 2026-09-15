# Handover — every product the shape of latchkey

*2026-09-15, revised 2026-09-16 (runsheet built). Read this first; then `PLATFORM.md` (the rule and the
audit), `COMMON.md` (how a site is built), `ROLLOUT.md` (status) and
the brief for the product you are working on.*

## The rule

Every product is latchkey's shape, exactly:

- **API**: a loom service — one Go binary, one Postgres on redback,
  Cloud Run, Latchkey for identity — at `api.<domain>` (plus `hooks.`
  where webhooks arrive; tripline also has `ingest.`).
- **Console**: `@latchkey/shell`, a Cloudflare Pages site at
  `app.<domain>` (latchkey's is `console.latchkey.id`; runsheet's
  `console.runsheet.dev` — existing names stay), calling the API with
  CORS on the console origin. Never embedded in the binary.
- **Site**: `@latchkey/www`, a Cloudflare Pages site at the apex and
  `www.`. Static. Deployed by wrangler from a workflow on push to main.
- Pages projects, custom domains and DNS are Terraform in the product's
  `infra/cloudflare`. Deploy secrets are `CLOUDFLARE_API_TOKEN` +
  `CLOUDFLARE_ACCOUNT_ID` on the repo.

Nothing else: no Vercel, no Supabase, no Next.js, no second backend
runtime. Out of scope by decision: grapevine, inflow, Pay N Tally,
1099-W9, optrader.

## Status, 2026-09-15

| Product | API | Console | Site | Remaining |
| --- | --- | --- | --- | --- |
| latchkey | loom ✓ | Pages ✓ | **live** on the shell (ui#46) | nothing |
| wardroom | scaffolded, not deployed | scaffolded for Pages, not deployed | **live** wardroom.id | build the product; `infra/gcp` + `infra/latchkey` applies; `console.yml` → push-on-main |
| purser | same | same | **live** purser.id | same |
| foghorn | same | same | **live** foghorn.id | same |
| Project Mesh | `mesh-api` plain Go, not loom | `mesh-portal` on Pages ✓ | **live** projectmesh.io on the shell | rewrite mesh-api as loom (own ADR); mesh-portal onto `@latchkey/shell` |
| thirtysixzero | Next.js + Supabase on Vercel | same app | built, on `thirtysixzero-www.pages.dev`; apex still Vercel | **Chris**: add `app.thirtysixzero.io` to the Vercel project, drop apex/www there, update Supabase site + redirect URLs → then `site_enabled = true` in its `infra/cloudflare` and delete the old Vercel A/`www` records. Later: the full loom + shell rewrite (own ADR) |
| tripline | loom ✓ | **embedded in the binary** ✗ | none | console → Pages first (`PLATFORM.md`, the three scaffolds are the reference), then the site (`TRIPLINE.md`) |
| runsheet | Supabase → loom (ADR-001 in progress) | Workers + supabase-js → gateway client (ADR-001) | **built** 2026-09-16 on the shell, static, `mailto:` contact (`runsheet/website@76b5222` on `www`, unpushed) | **Chris**: push `www` in `runsheet/website` and `runsheet/runsheet` (the latter adds `infra/cloudflare/pages.tf`); set `CLOUDFLARE_API_TOKEN` (needs Pages:Edit) + `CLOUDFLARE_ACCOUNT_ID` on `runsheet/website`; apply `infra/cloudflare` with `site_enabled = false` (new var `account_id`); merge → the workflow deploys to `runsheet-www.pages.dev`; then Workers → `website` → Domains & Routes: remove `runsheet.dev` and `www.runsheet.dev`; `site_enabled = true`, apply; delete the Worker |

## Things learned doing the first six (so you don't relearn them)

- **`latchkeyid/www` and `latchkeyid/shell` must stay public**: CI
  installs them as git dependencies anonymously; a private one fails
  `npm ci` with "Permission denied (publickey)".
- **A site inside an app repo** (thirtysixzero) inherits the app's
  `postcss.config`; set `vite.css.postcss.plugins = []` in
  `astro.config.mjs` or the build fails on `@tailwindcss/postcss`.
- **npm workspaces** (latchkeyid/ui) hoist the package: the Tailwind
  `@source` path is `../../../node_modules/@latchkey/www/src`.
- **`astro preview` daemonises** in Astro 7; serve `dist/` with
  `python3 -m http.server` for Playwright.
- **Astro slot forwarding**: an empty forwarded slot counts as present —
  decide fallbacks on `Astro.slots.render()` content (Nav/Footer do).
- **Pages first deploy**: a custom domain answers 522 until the first
  `wrangler pages deploy`; the apex cert can take a minute after.
- **The Cloudflare token** (Zone/DNS/Pages edit) is a repo secret on
  wardroomid, purserid, foghornid, thirtysixzero and mesh-marketing (the
  latter had its own). It was pasted into a chat once — rotate it. The
  rotation is now Terraform: `Serient/estate` (`deploy-tokens/`) mints
  one account-owned token per product and writes it into each deploying
  repo's secrets; one apply with the bootstrap token replaces all of them.
  Applies of a product's `infra/cloudflare` still use `TF_VAR_cloudflare_api_token`.
  Never write a token to a file.
- **Terraform state** for every `infra/cloudflare` is local on Chris's
  machine (`~/workspace/<org>/<repo>/infra/cloudflare/terraform.tfstate`)
  until each product's GCS bucket exists; treat like a secret.
- **A Worker custom domain holds its own DNS records**: a Pages domain
  for the same host cannot be created until the Worker releases it
  (runsheet's `site_enabled` gate, thirtysixzero's shape). Deploy to
  `<project>.pages.dev` first, release, then flip.
- **Contact forms**: runsheet's SendGrid + Turnstile form became
  `mailto:`; the site is static. If a form is ever wanted again it is a
  Pages Function in the same project, not a Worker.
- **Check the copy against the product, not the old site**: runsheet's
  Prologue page still described the editor-that-opens-PRs model four
  months after the pull-indexed pivot; "real content stays" means the
  facts, and the facts had moved.
- Site copy for an unbuilt product is written in the future-honest tense
  from its DESIGN.md ("designed, being built"), with `cta: null` until
  the console is deployed. Prices only where a product has real ones.

## Order for the next session

1. tripline: console to Pages (a production change — sequence it: API
   with CORS deployed, `api.tripline.id` mapped, console deployed to
   Pages, *then* flip `app.` in DNS), then its site.
2. thirtysixzero apex flip once Chris has done the Vercel/Supabase steps; runsheet apex flip once Chris has released the Worker's domains (table above).
3. Deploy the three scaffolded consoles (`console.yml` → push-on-main)
   when their APIs exist.
4. mesh-portal onto the shell; mesh-api and thirtysixzero as loom
   services — each its own ADR on runsheet's ADR-001 shape.
