import { ComponentPropsWithoutRef, ComponentType } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";

import { Button, ButtonLink } from "~/components/Button";
import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { BlueSkyIcon, GitHubIcon, LinkedInIcon } from "~/components/SocialIcons";
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

function ProfileIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function MailIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function BriefcaseIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function ArrowDownIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Article({ article }: { article: Article }) {
  return (
    <Card as="article">
      <Card.Title href={`./articles/${article.slug}`}>{article.title}</Card.Title>
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
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Profile() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-500/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <ProfileIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">About me</span>
      </h2>
      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
        I&apos;m Wei Yen, @yen223 on the internet. Ex-software engineer, currently working full-time on
        building{" "}
        <a
          href={"https://getselectable.com"}
          className="text-teal-500 underline"
        >
          Selectable
        </a>
        .
      </p>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        I like databases, programming languages, maths, and wordplay.
      </p>
      <div className="mt-6 flex gap-6">
        <SocialLink to="https://github.com/yen223" aria-label="Follow on GitHub" icon={GitHubIcon} />
        <SocialLink
          to="https://www.linkedin.com/in/weiyen/"
          aria-label="Follow on LinkedIn"
          icon={LinkedInIcon}
        />
        <SocialLink to={BLUESKY_LINK} aria-label="Follow on Bluesky" icon={BlueSkyIcon} />
      </div>
    </div>
  );
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
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
