# Rollout

The pattern every product is held to — loom API on Cloud Run, console
and site on Cloudflare Pages — and the audit of who fits it is
`PLATFORM.md`; this file is the site rollout.

One site at a time, each a PR on a `www` branch in the product's own
repo. Latchkey first because its site is the worst and its docs are the
most read; then the three new services, which have no site at all and
whose `infra/cloudflare` stacks are already in Terraform; then the
products with sites that work today.

**Not part of this**: grapevine, inflow, Pay N Tally, 1099-W9 and
optrader keep their own sites and are not in `house.ts`.

| # | Product | Site today | Where the new site lives | Accent | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | latchkey | one hand-written HTML file + 2 docs pages, brass, in `latchkeyid/ui/www` | `latchkeyid/ui/www` (replace contents) | shell's, verbatim | shipped 2026-09-15 (ui#46, live at latchkey.id) |
| 2 | foghorn | none; zone in Cloudflare, apex unmapped | `foghornid/foghorn/www` | shell's | shipped 2026-09-15 (e2d0090, live at foghorn.id) |
| 3 | purser | none | `purserid/purser/www` | shell's | shipped 2026-09-15 (0531f2d, live at purser.id) |
| 4 | wardroom | none | `wardroomid/wardroom/www` | shell's | shipped 2026-09-15 (4cb68de, live at wardroom.id) |
| 5 | tripline | none; apex parked at Namecheap | `triplineid/tripline/www` | shell's | ready — `TRIPLINE.md` |
| 6 | runsheet | Astro on Cloudflare, slate/indigo hand-rolled, in `runsheet/website` | `runsheet/website` (swap the layout) | shell's | built 2026-09-16 (76b5222 on `www`, unpushed); the apex is still the Worker `website` — cut-over steps in HANDOVER.md |
| 7 | Project Mesh | raw HTML + Tailwind CDN on the `mesh-marketing` Pages project, dark blue/cyan | `projectmesh-io/mesh-marketing` (replace contents) | from the site's variables | shipped 2026-09-15 (33afa67, live at projectmesh.io) |
| 8 | thirtysixzero | none — the Next.js app on Vercel is at the apex | `thirtysixzero/thirtysixzero/www` | provisional (steel) — confirm | built 2026-09-15 (09f5839, on thirtysixzero-www.pages.dev); apex flip waits on the Vercel/Supabase steps — see HANDOVER.md |

Status moves to "shipped <date> <sha>" when the PR merges and the Pages
deploy is live; note the live URL.

## Per-site checklist (the short form of COMMON.md)

1. Branch `www`. `npx degit latchkeyid/www/template www` (or into the
   existing site dir), `npm install`.
2. `global.css` accent line; `site.ts`; `astro.config.mjs` `site`.
3. Copy: hero, features, steps, the product visual, docs, changelog
   seed. Delete ThemeSwitcher, pricing if none, placeholder numbers.
4. `infra/cloudflare`: Pages project + domains + records (see the site
   brief); apply (Chris) — or leave the plan in the PR for Chris to apply.
5. Workflow: Pages deploy on push to main; repo secrets.
6. Verify (COMMON.md); commit; report.

## What changes in the package as sites adopt it

Expect small fixes to `@latchkey/www` from every adoption (a component
prop, a spacing, a docs-layout edge). Make them in the package, bump
the pin, note the sha in the report. `npm run screenshots` in the
package must still pass.
