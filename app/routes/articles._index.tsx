import { Card } from "~/components/Card";
import { SimpleLayout } from "~/components/SimpleLayout";
import { getCachedArticles } from "~/lib/articles.server";
import { formatDate } from "~/lib/formatDate";
import { z } from "zod";
import { useLoaderData } from "react-router";
import type { Article } from "~/lib/types";
import { ArticleZ } from "~/lib/types";

function Article({ article }: { article: Article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export const metadata = {
  title: "Articles",
  description:
    "Articles that I have written for fun and profit",
};

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
    <SimpleLayout
      title="✍️ Articles"
      intro="I write about maths, programming, and other things I find interesting."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
