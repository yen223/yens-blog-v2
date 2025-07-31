import { ContainerInner, ContainerOuter } from "~/components/Container";
import React from "react";
import { Link } from "@remix-run/react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/articles">Articles</NavLink>
                <NavLink href="/projects">Projects</NavLink>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} Wei Yen Lee. All rights
                reserved. This site is{" "}
                <a
                  href="https://github.com/yen223/yens-blog-v2"
                  className="text-teal-500 underline"
                >
                  open source
                </a>
                !
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
