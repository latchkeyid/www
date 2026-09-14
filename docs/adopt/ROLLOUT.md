# Rollout

One site at a time, each a PR on a `www` branch in the product's own
repo. Latchkey first because its site is the worst and its docs are the
most read; then the three new services, which have no site at all and
whose `infra/cloudflare` stacks are already in Terraform; then the
products with sites that work today.

| # | Product | Site today | Where the new site lives | Accent | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | latchkey | one hand-written HTML file + 2 docs pages, brass, in `latchkeyid/ui/www` | `latchkeyid/ui/www` (replace contents) | shell's, verbatim | ready — `LATCHKEY.md` |
| 2 | foghorn | none; zone in Cloudflare, apex unmapped | `foghornid/foghorn/www` | shell's | ready — `FOGHORN.md` |
| 3 | purser | none | `purserid/purser/www` | shell's | ready — `PURSER.md` |
| 4 | wardroom | none | `wardroomid/wardroom/www` | shell's | ready — `WARDROOM.md` |
| 5 | tripline | none; apex parked at Namecheap | `triplineid/tripline/www` | shell's | ready — `TRIPLINE.md` |
| 6 | runsheet | Astro on Cloudflare, slate/indigo hand-rolled, in `runsheet/website` | `runsheet/website` (swap the layout) | shell's | ready — `RUNSHEET.md` |
| 7 | grapevine | Next.js at gvn.au with real content | `GrapevineNetwork/website` | from the site's brand | later — bigger port |
| 8 | Pay N Tally, 1099-W9, inflow | Astro / Vite+React / — | their repos | payntally, ten99, inflow (provisional) | later |
| 9 | optrader, thirtysixzero, Project Mesh | Next.js app / Next.js / raw HTML | their repos | provisional accents | later — confirm accents first |

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
