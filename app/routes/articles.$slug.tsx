import { Container } from "~/components/Container";
import { Prose } from "~/components/Prose";
import { loadArticle } from "~/lib/articles.server";
import { z } from "zod";
import { LoaderFunctionArgs } from "@remix-run/router";
import { useLoaderData } from "react-router";
import markdoc from "@markdoc/markdoc";
import React from "react";
import {ArticleZ} from "~/lib/types";
import {formatDate} from "~/lib/formatDate";
import {ButtonLink} from "~/components/Button";
import { Fence, fence } from "~/lib/syntaxHighlight";

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ParamZ = z.object({ slug: z.string() });
const LoaderDataZ = z.object({
  article: ArticleZ,
});
type LoaderData = z.infer<typeof LoaderDataZ>;

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const slug = ParamZ.parse(params).slug;
  const article = await loadArticle(slug);
  // const articles = await getAllArticles();
  // const article = articles.find((x) => x.slug == slug);
  if (!article) {
    throw new Response(null, {
      status: 404,
      statusText: `${slug} not Found`,
    });
  }
  return { article };
}

export default function Article() {
  const data = useLoaderData();
  const { article } = LoaderDataZ.parse(data);
  const ast = markdoc.parse(article.content);
  const node = markdoc.transform(ast, { nodes: { fence } });

  return (
    <Container className="mt-16">
      <div className="xl:relative">
        <div className="mx-auto max-w-3xl">
          <ButtonLink
              type="button"
              to={"/articles"}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </ButtonLink>
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              {markdoc.renderers.react(node, React, {components: { Fence }})}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  );
}
