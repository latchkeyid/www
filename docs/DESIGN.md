# @latchkey/www — design brief

One design for the product marketing sites, the way `@latchkey/shell` is
one design for the consoles. This is the contract; `docs/research/
trends.json` is the evidence (what was looked at in September 2026,
what was adopted, what was rejected and why).

## The idea

A visitor reads a site and then opens the console. The two must be one
object seen twice: the **same neutral** (the shell's mauve-tinted scale)
and the **same accent per product**, but a different register — a site
is read, a console is scanned. So the site gets an editorial type scale
(a serif display face over the console's Geist), a wider rhythm, one
ambient glow, and the product shown working, on the same tokens.

## Stack

Astro 7, static output, Tailwind v4 via `@tailwindcss/vite`, MDX content
collections for docs and changelog, Cloudflare Pages. No framework
runtime: the two behaviours (theme class, reveal-on-scroll) are inline
scripts. React islands are available through `@astrojs/react` for a
product that wants a live demo; nothing in the shell needs one.
Consumed as a git dependency shipping Astro source, like the shell.

## Tokens (`src/theme/base.css` + one accent file per product)

- **Neutral**: the shell's mauve 1–12, light and dark tuned separately.
  A site sits one step lighter than the console (`--background` =
  mauve-2, cards on mauve-1): paper, not panel. Borders are hairline
  alpha; cards lift by border and a soft two-layer shadow.
- **Accent**: `--primary`, `--primary-foreground`, `--accent-2` (the
  second gradient stop), `--accent-soft`, `--ring`. The six console
  products' files are the shell's, verbatim. The others (grapevine,
  inflow, payntally, ten99, optrader, thirtysixzero, projectmesh) are
  defined here from their sites' brand values where one exists; the
  header of each file says its source, and three are marked
  PROVISIONAL.
- **Type**: Geist body at 17px/1.65 (`text-base`), Geist Mono for
  eyebrows and code, **Instrument Serif** for display — `display-1`
  (hero, fluid 44–84px, tracking −0.02em), `display-2` (section
  headings), `display-3` (docs h2s). One italic word in the product
  colour (`display-accent`) is the only decoration a headline gets.
  `eyebrow` is mono, 12px, uppercase, tracking 0.12em, in the accent.
  A product may override `--display-face` in its accent file.
- **Status hues** exist for badges only (`--success`, `--warning`,
  `--info`, `--destructive`); never an accent.
- **Radius**: 6px controls, 12px cards and windows, 16px+ for bento cells.

## The finish

- `glow` — one wide radial in `--primary` and a second in `--accent-2`,
  at 14–24% alpha, blurred, behind the hero and the closing CTA. Not a
  blob field: it reads as light on the page.
- `grain` — an SVG-noise overlay on the glow (multiply in light, screen
  in dark) so the light looks printed, not rendered. CSS only.
- `glass` — the sticky nav at 72% background with a blur.
- `.btn-primary` — the console's primary button exactly: the
  `--primary → --accent-2` gradient with the inset top highlight.
- `reveal` — a 12px fade-up on entering the viewport, staggered by
  `transition-delay` in the hero; `prefers-reduced-motion` turns it off.
- Dark mode follows the system by default with a persisted override
  (`www.theme`), applied before first paint.

## Composition rules

1. **The hero is text, left-aligned, then the product.** Eyebrow, a
   display headline with one accent word, a lede, two buttons, and the
   product itself below — a `Terminal`, a `Window` with a screenshot or a
   live island. Never a stock illustration.
2. **Sections are eyebrow + display heading + lede on the left**, then
   content. The rhythm is 80–112px between sections; `spacing="tight"`
   halves it for stacked ones.
3. **Features are a hairline grid** (`Features`/`Feature`): cells
   separated by 1px of border, not floating cards.
4. **A bento earns its place by size meaning importance** — one big cell
   with the product visual, small cells for supporting facts. Otherwise
   use `Features`.
5. **Show, don't say**: `Terminal` and `Window` are static markup (the
   real commands, the real console) so they index, print and never lag.
6. **Few nav links, one CTA.** Product / Pricing / Docs / Changelog, a
   ghost "Sign in" and a primary "Console".
7. **The footer ends with the house**: every sibling product with its
   accent dot, so each site points at the others.
8. **Long-form is `.prose`** — docs, changelog, legal — with serif
   headings, mono code, accent-underlined links, a serif pull-quote.
9. Phone first: one column, 24px gutters, the terminal scrolls inside its
   frame, the nav collapses to a `<details>` menu with no script.

## Rejected (see trends.json)

Bento everywhere; gradient blobs and glassmorphism as decoration; heavy
scroll-jacking and kinetic type; WebGL/3D heroes; AI-generated imagery;
stock photography; centred-everything layouts; a second typeface for
body copy. Each is in the research file with the reason.
