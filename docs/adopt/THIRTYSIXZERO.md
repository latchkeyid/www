# Adopt in thirtysixzero's www

Repo: `thirtysixzero/thirtysixzero` — the product itself, a Next.js 16
app (App Router, Supabase, Drizzle, pnpm) deployed on Vercel
(`vercel.json`). There is no marketing site; the app's `app/page.tsx`
is the entry. The `thirtysixzero.io` zone is in Cloudflare.

- **Decision for Chris before starting**: the site wants the apex.
  Either the app moves to `app.thirtysixzero.io` (a Vercel domain
  change + a DNS record) and the site takes `thirtysixzero.io` +
  `www.`, or the site lives at `www.thirtysixzero.io` only and the apex
  stays the app. Write the brief's DNS step for whichever is chosen.
- The site lives at `www/` in this repo, built and deployed by its own
  workflow (`www.yml`: `paths: [www/**]`, Node 22, `npm ci && npm run
  build`, `wrangler pages deploy dist --project-name thirtysixzero-www`;
  repo secrets `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`). The
  Pages project, custom domain(s) and proxied CNAME(s) are new: add a
  small `infra/cloudflare` stack on the wardroom shape (`FOGHORN.md`
  has the resources; this zone takes `var.zone_id` like tripline's) —
  or, if Chris prefers no Terraform in an app repo, say so and create
  them in the dashboard, recorded in the PR.
- Product id `thirtysixzero`; accent `thirtysixzero.css` is
  **PROVISIONAL** (steel, `#3E6596` / `#7EA7DC`) — the app is black on
  white with no brand colour. Confirm it with Chris or propose one from
  the app's own UI before the first screenshot.
- Copy from `README.md`: configuration items connected to the tools
  that run your business — CI types, configuration items, plugins
  (GitHub deployments, PagerDuty incidents, Stripe revenue),
  connections. Hero headline suggestion: "Every system, on *one* item."
  Hero visual: a `Window` of a CI ("Checkout Service") with three plugin
  cards showing live data — the concept table made visible. Features =
  the four concepts; Steps = create a CI type, add an item, attach a
  plugin. No pricing until there is one. Docs: the README's concepts
  and getting started as two MDX pages. Changelog: last three
  user-visible commits.
- Nav: Product, Docs, Changelog; primary "Sign in" → the app's URL
  (whichever host it ends up on); no secondary.
