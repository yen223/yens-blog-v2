import { Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";

import { getCachedArticles } from "~/lib/articles.server";
import type { Article } from "~/lib/types";
import { ArticleZ } from "~/lib/types";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function splitDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    year: d.getUTCFullYear().toString(),
    month: MONTHS[d.getUTCMonth()],
    day: d.getUTCDate().toString(),
  };
}

function PostRow({ article }: { article: Article }) {
  const { year, month, day } = splitDate(article.date);
  return (
    <li className="post-row">
      <Link
        to={`/articles/${article.slug}`}
        className="post-link"
        prefetch="intent"
      >
        {article.title}
      </Link>
      <div className="post-date">
        <span className="num">{year}</span>
        <span className="dot">·</span>
        <span>
          {month} {day}
        </span>
      </div>
      <div className="post-main">
        <div className="post-title">{article.title}</div>
        <div className="post-dek">{article.description}</div>
      </div>
      <div className="post-tags">
        {article.tags.map((t, i) => (
          <span
            key={t}
            className={`tag ${
              i === 0 ? "tag-accent" : i === 1 ? "tag-moss" : ""
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </li>
  );
}

export const meta = () => [
  { title: "Articles — Wei Yen" },
  {
    name: "description",
    content:
      "Essays and longer thoughts on maths, programming, and other things I find interesting.",
  },
];

const LoaderDataZ = z.object({ articles: ArticleZ.array() });
type LoaderData = z.infer<typeof LoaderDataZ>;

export async function loader(): Promise<LoaderData> {
  const articles = await getCachedArticles();
  return { articles };
}

export default function ArticlesIndex() {
  const data = useLoaderData();
  const { articles } = LoaderDataZ.parse(data);

  return (
    <>
      <div className="section-head" style={{ borderTop: "none" }}>
        <span className="kicker">articles</span>
        <h2>
          Essays &amp; <em>longer thoughts</em>
        </h2>
      </div>
      <ul className="post-list">
        {articles.map((article) => (
          <PostRow key={article.slug} article={article} />
        ))}
      </ul>
    </>
  );
}
