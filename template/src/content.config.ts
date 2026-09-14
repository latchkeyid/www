import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Docs pages: one MDX per page, grouped by `group`, ordered by `order`.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
  schema: z.object({ title: z.string(), description: z.string(), group: z.string(), order: z.number().default(0) }),
});

// Changelog: one MDX per release, newest first by date.
const changelog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/changelog" }),
  schema: z.object({ title: z.string(), date: z.coerce.date(), tag: z.string().optional() }),
});

export const collections = { docs, changelog };
