import { ComponentPropsWithoutRef, ComponentType } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";

import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import {
  BlueSkyIcon,
  GitHubIcon,
  LinkedInIcon,
  ProfileIcon,
} from "~/components/Icons";
import { getCachedArticles } from "~/lib/articles.server";
import { formatDate } from "~/lib/formatDate";
import type { Article } from "~/lib/types";
import { ArticleZ } from "~/lib/types";
import { BLUESKY_LINK } from "~/constants";

const LoaderDataZ = z.object({ articles: ArticleZ.array() });
type LoaderData = z.infer<typeof LoaderDataZ>;

export async function loader(): Promise<LoaderData> {
  const articles = (await getCachedArticles()).slice(0, 10);
  return { articles };
}

function Article({ article }: { article: Article }) {
  return (
    <Card as="article">
      <Card.Title href={`./articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({
  icon: Icon,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-400 transition group-hover:fill-zinc-300" />
    </Link>
  );
}

function Profile() {
  return (
    <div className="rounded-2xl border border-zinc-500/40 p-6">
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <ProfileIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">About me</span>
      </h2>
      <p className="mt-6 text-sm text-zinc-400">
        I&apos;m Wei Yen, @yen223 on the internet. Ex-software engineer,
        currently working full-time on building{" "}
        <a
          href={"https://getselectable.com"}
          className="text-teal-500 underline"
        >
          Selectable
        </a>
        .
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        I like databases, programming languages, maths, and wordplay.
      </p>
      <div className="mt-6 flex gap-6">
        <SocialLink
          to="https://github.com/yen223"
          aria-label="Follow on GitHub"
          icon={GitHubIcon}
        />
        <SocialLink
          to="https://www.linkedin.com/in/weiyen/"
          aria-label="Follow on LinkedIn"
          icon={LinkedInIcon}
        />
        <SocialLink
          to={BLUESKY_LINK}
          aria-label="Follow on Bluesky"
          icon={BlueSkyIcon}
        />
      </div>
    </div>
  );
}


export default function Home() {
  const data = useLoaderData();
  const { articles } = LoaderDataZ.parse(data);
  return (
    <Container className={"mt-16"}>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
        <div className="flex flex-col gap-10 lg:pr-16 xl:pr-24">
          <Profile />
          {/* <Newsletter /> */}
        </div>
        <div className="flex flex-col gap-16 py-6">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </Container>
  );
}
