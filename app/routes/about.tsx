import clsx from "clsx";

import { Container } from "~/components/Container";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "~/components/SocialIcons";
import portraitImage from "~/images/portrait.jpg";
import { Link } from "@remix-run/react";
import { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        to={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export const meta = () => {
  return [
    { title: "About - Wei Yen" },
    { name: "description", content: "All about me" },
  ];
};

export default function About() {
  return (
    <Container className="mt-16">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Wei Yen.
          </h1>
          <div className="mt-6 space-y-12 prose prose-zinc dark:prose-invert">
            <section>
              <p>
                I'm currently working full-time on building{" "}
                <a href={"https://getselectable.com"}>
                  Selectable
                </a>
                .
              </p>
              <p>
                I love maths, coffee, and all things programming.
              </p>
              <p>
                I was previously a software engineer at Rokt, Mathspace, Western Digital and Accenture.
              </p>
            </section>
            <section>
              <h2>About this site</h2>
              <p>
                This site is built with <a href="https://remix.run">Remix</a> and hosted on <a href="https://developers.cloudflare.com/pages">Cloudflare Pages</a>.
              </p>
              <p>
                The design is based on <a href="https://tailwindui.com/templates/spotlight">Tailwind Spotlight</a>
              </p>
            </section>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul>
            <SocialLink href="https://github.com/yen223" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/weiyen/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:hello@weiyen.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              hello@weiyen.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
}
