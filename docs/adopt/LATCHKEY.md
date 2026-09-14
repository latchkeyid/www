# Adopt in latchkey's www

Repo: `latchkeyid/ui`, workspace `www/` (npm workspaces root; siblings
`console/`, `spa/`, `native/`). Today `www/site/` is one hand-written
`index.html` in a brass-on-black look that matches nothing else, plus
`site/docs/quickstarts/index.html` and `site/docs/auth-hooks/index.html`
in the same style. Deployed as-is by `.github/workflows/deploy.yml`
(`wrangler pages deploy site --project-name latchkey-www`). The Pages
project, `latchkey.id` + `www.latchkey.id` domains and DNS are already
Terraform in `latchkeyid/infra/cloudflare/latchkey.tf` — **nothing to do
on the Cloudflare side.**

- Replace `www/` with the template (keep `www/package.json`'s name
  `www` so the workspace and `npm run deploy:www` keep working; add the
  template's scripts and dependencies to it). Product id `latchkey`;
  accent `latchkey.css`; `site: "https://latchkey.id"`.
- The template's `index.astro` is already written in Latchkey's voice
  from the README and roadmap (passwordless, standard OIDC, yours,
  enterprise SSO, tenants/teams/roles, keys and webhooks; the three
  steps; the bento of console / audit / mail / Terraform / trust). Check
  every claim against `latchkeyid/latchkey/README.md` and `ROADMAP.md`;
  the stats row is placeholder — replace with measured numbers or drop
  the row. **Drop `/pricing` entirely**: Latchkey has no pricing.
- Docs: port the two pages to `src/content/docs/` as MDX, keeping their
  headings — Quickstarts (single-page app, React Native / Expo,
  backend, where the pieces live) and Auth hooks (why, the request, the
  response, what lands in the token, stored grants, setup). Keep the
  URLs `/docs/quickstarts/` and `/docs/auth-hooks/` (the template's
  sample slugs are `quickstart` and `auth-hooks`; rename the file and
  update `site.ts` links). Add a third page, "Discovery", that is just
  the OIDC discovery document explained, linking to
  `https://auth.latchkey.id/.well-known/openid-configuration`.
- Changelog: seed from `ROADMAP.md`'s "Shipped" list — the last three
  dated entries (session links, passkeys, magic-link hardening;
  attempts dashboard; org API paging) as MDX with the PR numbers.
- Nav: Product, Docs, Changelog; secondary "Sign in" →
  `https://console.latchkey.id`; primary "Console" (the default from
  `house.ts`). Footer columns: Product (Features, Changelog), Developers
  (Quickstarts, Auth hooks, Discovery, Terraform provider →
  `github.com/latchkeyid/terraform-provider-latchkey`), Company (GitHub,
  Privacy, Terms — the last two link to pages that must exist; write
  short real ones or leave the links out).
- `deploy.yml`: the www step becomes `npm run build -w www` before it
  and `wrangler pages deploy www/dist` (not `site`). Keep the console
  step untouched.
- Delete `www/site/` when the port is complete.
