# Adopting @latchkey/www — common rules

The handover for rolling the marketing shell out to a product site.
Read `docs/DESIGN.md` and the package `README.md` first; `ROLLOUT.md`
has the order and the status; each `<PRODUCT>.md` has what differs.

## The shape of every site

- **Astro 7, static output, Tailwind v4, MDX collections, Cloudflare
  Pages.** No framework runtime. A React island only where a product
  has a live demo worth it (none do yet).
- **Start from `template/`** (`npx degit latchkeyid/www/template <dir>`),
  not from the old site. Copy the old site's *facts* (copy, links,
  docs) into the template's pages; do not port its markup or CSS.
- The dependency is the package at a pinned commit:
  `"@latchkey/www": "github:latchkeyid/www#<sha>"`. During adoption a
  local path (`"file:../../www"` or the right relative path) is fine so
  package fixes land in both places; the final commit pins the sha.
- `src/styles/global.css` is exactly:
  ```css
  @import "tailwindcss";
  @import "@latchkey/www/theme/base.css";
  @import "@latchkey/www/theme/<product>.css";
  @source "../../node_modules/@latchkey/www/src";
  ```
  No other stylesheet. If the site needs a style the shell lacks, add
  it to the shell (with a note in the report), not to the site.
- `src/site.ts` carries the product id (a key in `house.ts`), the nav
  links, the footer columns, the secondary CTA. `src/layouts/Site.astro`
  and `Docs.astro` (the template's thin wrappers) are the only layouts
  pages import.
- **Delete `src/components/ThemeSwitcher.astro`** and every `<ThemeSwitcher />`;
  the accent is the one line in `global.css`.
- Pages every site has: `/` (landing), `/docs/<page>` from the `docs`
  collection (even if it is one page), `/changelog` from the `changelog`
  collection (seed it with the last three real releases from the repo's
  history), `/404`. `/pricing` only when the product has pricing; the
  template's tiers are placeholder and must not ship.
- **Copy rules**: the hero headline is a sentence with one `*accent*`
  word; the lede is one or two sentences in the product's README voice;
  features are the README's bullets, not adjectives; the `Terminal` or
  `Window` in the hero shows the product's real first command or real
  console. No testimonial unless it is a real quote. No numbers that
  are not measured.
- **`house.ts`** must already list the product with its URL and console
  URL; fix it in the package if not.
- `astro.config.mjs`: set `site` to the real origin (canonical URLs and
  the sitemap depend on it).
- **Hosting**: a Cloudflare Pages project per site, deployed by
  `wrangler pages deploy dist --project-name <product>-www --branch=main`
  from a GitHub Actions workflow on push to main (repo secrets
  `CLOUDFLARE_API_TOKEN` with Pages:Edit and `CLOUDFLARE_ACCOUNT_ID` —
  the `latchkeyid/ui` repo has both; copy the values, don't mint new
  ones unless a token is scoped per project). The Pages project, its
  custom domains (apex + `www.`) and the DNS records (proxied CNAMEs to
  `<project>.pages.dev`; the apex works through Cloudflare's CNAME
  flattening) are **Terraform in the product's `infra/cloudflare`**,
  on the shape of `latchkeyid/infra/cloudflare/latchkey.tf`
  (`cloudflare_pages_project` with `ignore_changes = [build_config,
  deployment_configs]`, `cloudflare_pages_domain` for each host,
  `cloudflare_dns_record` proxied). Never click these into the dashboard.
- **Verify** before reporting: `npm run check` (astro check) and
  `npm run build` green; open the built `dist/` in a browser (or
  `python3 -m http.server -d dist`) and check light and dark, the phone
  width (400px, no horizontal scroll), every nav link resolves, the
  footer ring links to the siblings, `view-source` shows title,
  description, canonical and OG tags; no console errors.
- **Commit on a branch named `www`** in the product's repo under the
  repo's git identity (user.name "Chris Kolenko", user.email
  "1318186+chriskolenko@users.noreply.github.com"). No Co-Authored-By
  lines and no Claude attribution anywhere (commit messages, code, PR
  text). Do not push; I will.
- **Report**: what pages exist and where the copy came from, what was
  deleted, the Pages project / DNS changes made or still needed, any
  shell change you had to make (with the www commit sha), and anything
  from DESIGN.md you could not follow and why.
