import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getAllArticles } from "~/lib/articles.server";

export const loader: LoaderFunction = async ({ request }) => {
  const articles = await getAllArticles();
  const SITE_URL = "https://weiyen.net";
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Wei Yen's Blog</title>
    <description>Wei Yen's personal blog</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
    ${articles
      .filter((article) => article.published)
      .map((article) => `
      <item>
        <title>${article.title}</title>
        <description>${article.description}</description>
        <link>${SITE_URL}/articles/${article.slug}</link>
        <guid>${SITE_URL}/articles/${article.slug}</guid>
        <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
