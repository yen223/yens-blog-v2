import type { LinksFunction } from "@remix-run/cloudflare";
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
import { Container } from "./components/Container";
import { SimpleLayout } from "./components/SimpleLayout";

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
    type: "image/svg+xml",
    href: "/favicon.svg"
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black overflow-y-scroll">
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