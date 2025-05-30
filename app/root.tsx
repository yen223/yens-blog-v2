import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import "./prism.css";
import { RootLayout } from "~/components/RootLayout";
import {
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { SimpleLayout } from "./components/SimpleLayout";

export const meta = () => {
  return [
    { title: "Wei Yen's Personal Site" },
    { name: "description", content: "I'm Wei Yen, a software engineer based in Sydney. I write about software development, programming, and technology." },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Wei Yen's Personal Site" },
    { name: "twitter:description", content: "I'm Wei Yen, a software engineer based in Sydney. I write about software development, programming, and technology." },
    { property: "og:title", content: "Wei Yen's Personal Site" },
    { property: "og:description", content: "I'm Wei Yen, a software engineer based in Sydney. I write about software development, programming, and technology." },
    { property: "og:type", content: "website" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32", 
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-zinc-50 dark:bg-zinc-950">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex bg-zinc-50 dark:bg-zinc-900 overflow-y-scroll">
        <RootLayout>{children}</RootLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <SimpleLayout
        title={`${error.status} ${error.statusText}`}
        intro={error.data}
      >
        <Link to="/">Go back to the home page</Link>
      </SimpleLayout>
    );
  } else {
    return (
      <SimpleLayout
        title="Something went wrong"
        intro="Sorry, an unexpected error occurred."
      />
    );
  }
}