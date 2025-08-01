import { Card } from "~/components/Card";
import { SimpleLayout } from "~/components/SimpleLayout";
import logoSelectable from "~/images/logos/selectable-app.png";
import logoCrossword from "~/images/logos/crossword.svg";
import { Link } from "@remix-run/react";
import { LinkIcon } from "~/components/Icons";

const projects = [
  {
    name: "Selectable",
    description: "A mobile-friendly Postgres database management app",
    link: { href: "https://getselectable.com", label: "getselectable.com" },
    logo: logoSelectable,
  },
  {
    name: "The unofficial Guardian crossword archives",
    description:
      "The Guardian cryptic crosswords, but with a more mobile-friendly interface.",
    link: {
      href: "https://unofficial-guardian-crossword-app.pages.dev/",
      label: "unofficial-guardian-crossword-app.pages.dev",
    },
    logo: logoCrossword,
  },
];

export default function Projects() {
  return (
    <SimpleLayout
      title="💼 Projects"
      intro="A selection of projects I've worked on that I'm proud to show to the world."
    >
      <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md shadow-zinc-800/5">
              <img
                src={project.logo}
                alt=""
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-100">
              <Card.Link to={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-200 transition group-hover:text-teal-500">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
      <section className="prose prose-zinc prose-invert">
        <h2 className="text-2xl font-semibold text-zinc-100">
          🛠️ Tools
        </h2>
        <ul className="space-y-4">
          <li>
            <Link to="/projects/key-event-viewer">Keyboard Event Viewer</Link> -
            A tool to view keyboard events in the browser
          </li>
          <li>
            <Link to="/projects/sql-ast-parser">SQL AST Parser</Link> - A tool
            to show the AST of a SQL statement
          </li>
          <li>
            <Link to="https://github.com/yen223/hotpot">Hotpot</Link> - A
            command-line alternative to Google Authenticator, to manage 2FA
            tokens
          </li>
        </ul>
      </section>
    </SimpleLayout>
  );
}
