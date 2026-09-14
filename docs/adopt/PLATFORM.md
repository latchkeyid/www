# The platform pattern, and what has to change to fit it

Every product is the same two things: a **loom API** (one Go binary,
one Postgres on redback, Cloud Run, Latchkey for identity) and **web
surfaces on Cloudflare Pages** — the console on `@latchkey/shell`, the
site on `@latchkey/www`. Nothing else: no embedded SPAs, no Vercel, no
Supabase, no second backend runtime. Anything that does not fit changes.

| Product | API | Console | Site | Fits? | What changes |
| --- | --- | --- | --- | --- | --- |
| latchkey | loom on Cloud Run | Pages (`latchkey-console`) | Pages (`latchkey-www`) | yes | the site's contents (`LATCHKEY.md`) |
| tripline | loom on Cloud Run | **embedded in the binary**, served by Cloud Run at app.tripline.id | none | no | move the console to Pages: a `tripline-console` project, `app.` → Pages, the API on `api.tripline.id` with CORS for the console origin (`TRIPLINE_CONSOLE_ORIGIN`), `VITE_API_BASE` in the console build, `console.yml`; ingest stays where it is. Then the site (`TRIPLINE.md`) |
| runsheet | Supabase → loom (ADR-001, in progress) | Cloudflare Workers with supabase-js → becomes a gateway client (ADR-001) | Astro on Cloudflare | not yet | finish ADR-001; the site is a layout swap (`RUNSHEET.md`) |
| wardroom, purser, foghorn | loom on Cloud Run (scaffolded) | Pages (`<name>-console`, scaffolded 2026-09-15) | Pages (`<name>-www`, Terraform in place) | yes | build the products; sites per their briefs |
| Project Mesh | `mesh-api` is plain Go (jwkset, websocket) on its own Dockerfile — not loom | `mesh-portal` is Vite on Pages | Pages (`mesh-marketing`) | half | rewrite `mesh-api` as a loom service on Cloud Run behind Latchkey (its own ADR, the runsheet shape); the site (`PROJECTMESH.md`) can go first |
| thirtysixzero | Next.js 16 + Supabase + Drizzle on Vercel | the same Next.js app | none | no | the full move: a loom service (`thirtysixzero` binary; CI types, items, plugins, connections as aggregates; plugin fetches as effects), a console on the shell as a Pages site, Latchkey for identity, Supabase and Vercel retired. Its own ADR-001. The site (`THIRTYSIXZERO.md`) can go first and take the apex, since the app will move anyway |

Out of scope by decision (2026-09-15): grapevine, inflow, Pay N Tally,
1099-W9, optrader.

## The console-on-Pages shape (what tripline moves to; what the three scaffolds do)

- The binary serves `/health`, `/config.json` and `/v1/*` only, with a
  `cors(origin)` wrapper on the last two for `<NAME>_CONSOLE_ORIGIN`
  (latchkey's `LATCHKEY_CONSOLE_ORIGIN` shape). No `//go:embed`, no node
  stage in the Dockerfile.
- The console calls `apiBase() + path`: `VITE_API_BASE` at build, else
  `https://api.<name>.id`; empty in dev, where Vite proxies `/v1` and
  `/config.json` to the local binary.
- `infra/gcp`: Cloud Run domain mappings for `api.` and `hooks.` only;
  `console_origin` variable → the two env vars.
- `infra/cloudflare`: `cloudflare_pages_project` + `cloudflare_pages_domain`
  + proxied CNAME for `app.` (console) and for the apex + `www.` (site);
  DNS-only CNAMEs to `ghs.googlehosted.com` for `api.` and `hooks.`.
- Workflows: `deploy.yml` (API), `console.yml` (wrangler pages deploy
  from `console/`), `www.yml` (from `www/`).
