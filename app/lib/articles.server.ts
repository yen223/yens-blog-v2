import { Article, FrontmatterZ } from "~/lib/types";
import markdoc from "@markdoc/markdoc";
import yaml from "js-yaml";

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

export async function loadArticle(slug: string): Promise<Article | null> {
  try {
    const file = (await import(`../articles/${slug}.md?raw`)) as {
      default: string;
    };
    const content = file.default;
    return parseToArticle(slug, content);
  } catch (e) {
    return null;
  }
}

export const getAllArticles = async (): Promise<Article[]> => {
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
    const slug = file.replace("../routes/articles/", "").replace(/\.md$/, "");
    return parseToArticle(slug, content);
  });
  return articles
    .filter((article) => article.published)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date));
};
