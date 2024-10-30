import { Article, FrontmatterZ } from "~/lib/types";
import markdoc from "@markdoc/markdoc";
import yaml from "js-yaml";

let articlesCache: Article[] | null = null;
let articlesBySlugCache: Map<string, Article> | null = null;

const getAllArticles = async (): Promise<Article[]> => {
  const modules = import.meta.glob("../articles/*.md", {
    query: "?raw",
    eager: true,
  });
  const articles = Object.entries(modules).map(([file, fileContent]) => {
    const content = (
      fileContent as {
        default: string;
      }
    ).default;
    const slug = file.replace("../articles/", "").replace(/\.md$/, "");
    return parseToArticle(slug, content);
  });
  return articles
    .filter((article) => article.published)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date));
};

async function initializeArticlesCache() {
  if (articlesCache === null) {
    articlesCache = await getAllArticles();
    articlesBySlugCache = new Map(
      articlesCache.map(article => [article.slug, article])
    );
  }
}

// Initialize cache on server startup
initializeArticlesCache().catch(error => {
  console.error('Failed to initialize articles cache:', error);
});

export async function getCachedArticle(slug: string): Promise<Article | null> {
  await initializeArticlesCache();
  return articlesBySlugCache?.get(slug) ?? null;
}

export async function getCachedArticles(): Promise<Article[]> {
  await initializeArticlesCache();
  return articlesCache ?? [];
}

function parseToArticle(slug: string, content: string): Article {
  const ast = markdoc.parse(content);
  const frontmatterRaw = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
  const frontmatter = FrontmatterZ.parse(frontmatterRaw);
  return {
    ...frontmatter,
    content,
    slug,
  };
}
