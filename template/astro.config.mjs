// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static output: a marketing site is files on Cloudflare Pages
// (`wrangler pages deploy dist`). Add @astrojs/cloudflare only for a page
// that must render per request.
export default defineConfig({
  site: "https://example.latchkey.id",
  output: "static",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // The package ships Astro source and fonts; let Vite serve them from the parent checkout in dev.
    server: { fs: { allow: [".."] } },
  },
});
