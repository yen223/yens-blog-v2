// articles.json is generated at build time by the vite-plugin-articles plugin
// It contains all published articles from app/articles/*.md, sorted by date
// See app/lib/vite-plugin-articles.ts for the generation logic

import type { Article } from "~/lib/types";
import articlesJson from "../articles.json";

let articlesCache: Article[] | null = null;
let articlesBySlugCache: Map<string, Article> | null = null;

async function initializeArticlesCache() {
  if (articlesCache === null) {
    articlesCache = articlesJson as Article[];
    articlesBySlugCache = new Map(
      articlesCache.map((article) => [article.slug, article])
    );
  }
}

export async function getCachedArticle(slug: string): Promise<Article | null> {
  await initializeArticlesCache();
  return articlesBySlugCache?.get(slug) ?? null;
}

export async function getCachedArticles(): Promise<Article[]> {
  await initializeArticlesCache();
  return articlesCache ?? [];
}
