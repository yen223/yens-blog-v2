import { Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";

import {
  BlueSkyIcon,
  GitHubIcon,
  LinkedInIcon,
} from "~/components/Icons";
import { getCachedArticles } from "~/lib/articles.server";
import type { Article } from "~/lib/types";
import { ArticleZ } from "~/lib/types";
import { BLUESKY_LINK } from "~/constants";

const LoaderDataZ = z.object({
  articles: ArticleZ.array(),
  hasMore: z.boolean(),
});
type LoaderData = z.infer<typeof LoaderDataZ>;

const HOME_POST_LIMIT = 10;

export async function loader(): Promise<LoaderData> {
  const all = await getCachedArticles();
  return {
    articles: all.slice(0, HOME_POST_LIMIT),
    hasMore: all.length > HOME_POST_LIMIT,
  };
}

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
      <Link to={`/articles/${article.slug}`} className="post-link" prefetch="intent">
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

export default function Home() {
  const data = useLoaderData();
  const { articles, hasMore } = LoaderDataZ.parse(data);

  return (
    <>
      <section className="home-hero">
        <aside className="home-side-meta">
          <div className="line">
            <span className="label">tending</span>
            <span className="val">
              <a href="https://getselectable.com">Selectable</a>,{" "}
              <a href="https://stratachecks.com">StrataChecks</a>,{" "}
              <a href="https://eka.weiyen.net">Eka</a>
            </span>
          </div>
          <div className="line">
            <span className="label">based in</span>
            <span className="val">Sydney, AU</span>
          </div>
          <div className="line">
            <span className="label">elsewhere</span>
            <span className="val">
              <a href="https://github.com/yen223">github</a>,{" "}
              <a href="https://www.linkedin.com/in/weiyen/">linkedin</a>,{" "}
              <a href={BLUESKY_LINK}>bluesky</a>
            </span>
          </div>
          <div className="line">
            <span className="label">email</span>
            <span className="val">
              <a href="mailto:hello@weiyen.net">hello@weiyen.net</a>
            </span>
          </div>
        </aside>
        <div>
          <h1>
            Hi, I&apos;m <em>Wei Yen</em>
          </h1>
          <p className="lede">
            I&apos;m <strong>Wei Yen</strong> — a software engineer in Sydney.
            I&apos;m currently building{" "}
            <a href="https://getselectable.com">Selectable</a>, a mobile-friendly
            Postgres client, and <a href="https://stratachecks.com">StrataChecks</a>,
            a due-diligence tool for NSW strata buyers. I also maintain{" "}
            <a href="https://eka.weiyen.net">Eka</a>, a stateful AI agent with{" "}
            <a href="https://eka.weiyen.net/posts">a blog</a>.
          </p>
          <p className="lede">
            I like databases, programming languages, maths, and wordplay. Some
            posts are essays, some are half-finished <code>seedlings</code>. You
            are welcome to wander either.
          </p>
          <ul className="social-links">
            <li>
              <a href="https://github.com/yen223" aria-label="GitHub">
                <GitHubIcon />
                <span>github/yen223</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/weiyen/"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
                <span>linkedin/weiyen</span>
              </a>
            </li>
            <li>
              <a href={BLUESKY_LINK} aria-label="Bluesky">
                <BlueSkyIcon />
                <span>bluesky</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="section-head">
        <span className="kicker">
          <span className="arrow" aria-hidden="true" />
          01 / writing
        </span>
        <h2>
          Essays &amp; <em>longer thoughts</em>
        </h2>
      </div>

      <ul className="post-list">
        {articles.map((article) => (
          <PostRow key={article.slug} article={article} />
        ))}
      </ul>

      {hasMore && (
        <div className="post-list-more">
          <Link to="/articles" className="show-more" prefetch="intent">
            Show more articles →
          </Link>
        </div>
      )}
    </>
  );
}
