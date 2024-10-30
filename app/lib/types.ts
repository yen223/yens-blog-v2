import { z } from "zod";

export const FrontmatterZ = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.string().array(),
  description: z.string().default(""),
  published: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof FrontmatterZ>;
export const ArticleZ = FrontmatterZ.extend({
  content: z.string(),
  slug: z.string(),
});
export type Article = z.infer<typeof ArticleZ>;
