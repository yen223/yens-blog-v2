import { z } from "zod";
import { LoaderFunctionArgs } from "@remix-run/router";
import { useLoaderData } from "@remix-run/react";
import { getCachedArticle } from "~/lib/articles.server";
import { ArticleZ } from "~/lib/types";
import { formatDate } from "~/lib/formatDate";
import { BLUESKY_LINK } from "~/constants";
import { parseMarkdown } from "~/lib/markdown/parse";

const ParamZ = z.object({ slug: z.string() });
const LoaderDataZ = z.object({
  article: ArticleZ,
  formattedDate: z.string(),
});
type LoaderData = z.infer<typeof LoaderDataZ>;

function wordCount(s: string): number {
  return s
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = ParamZ.parse(params).slug;
  const article = await getCachedArticle(slug);
  if (!article) {
    throw new Response(null, {
      status: 404,
      statusText: `${slug} not Found`,
    });
  }
  const formattedDate = formatDate(article.date);
  const articleHtml =
    article.html ?? (await parseMarkdown(article.content)).value;
  const words = wordCount(article.content);
  const reading = Math.max(1, Math.round(words / 220));
  return { article, formattedDate, articleHtml, words, reading };
}

export function meta({ data }: { data: LoaderData }) {
  const { article } = data;
  return [
    { title: `${article.title}` },
    { name: "description", content: article.description },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.description },
    {
      property: "og:url",
      content: `https://weiyen.net/articles/${article.slug}`,
    },
    {
      property: "og:image",
      content: `https://weiyen.net/articles/${article.slug}/oggraph.png`,
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image",
      content: `https://weiyen.net/articles/${article.slug}/oggraph.png`,
    },
  ];
}

export default function Article() {
  const data = useLoaderData<typeof loader>();
  const { article, formattedDate, articleHtml, words, reading } = data;
  const primaryTag = article.tags[0];
  const otherTags = article.tags.slice(1);

  return (
    <article className="article-wrap">
      <div className="article-body">
        <header className="article-head">
          <h1 className="article-title">{article.title}</h1>
          {article.description ? (
            <p className="article-dek">{article.description}</p>
          ) : null}
          <div className="article-meta">
            <div>
              <span className="label">published</span>
              <span className="val">{formattedDate}</span>
            </div>
            <div>
              <span className="label">reading</span>
              <span className="val">
                ~{reading} min · {words.toLocaleString()} words
              </span>
            </div>
            <div>
              <span className="label">filed under</span>
              <span className="val">{primaryTag || "essay"}</span>
            </div>
            <div>
              <span className="label">tags</span>
              <span className="val">
                {otherTags.length ? otherTags.join(" · ") : "—"}
              </span>
            </div>
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: articleHtml }} />

        <div className="ornament">❋</div>

        <p>
          <em>
            Like this article? Follow me on{" "}
            <a href={BLUESKY_LINK}>Bluesky</a> or subscribe to the{" "}
            <a href="/feed/all">RSS feed</a> to get notified about new articles.
          </em>
        </p>
      </div>
    </article>
  );
}
