import { Link } from "@remix-run/react";

const projects = [
  {
    name: "StrataChecks",
    description:
      "A due diligence tool for NSW strata property buyers. Look up any strata scheme's tribunal history, management details, and get AI-powered risk analysis of strata reports.",
    link: { href: "https://stratachecks.com", label: "stratachecks.com" },
  },
  {
    name: "Selectable",
    description: "A mobile-friendly Postgres database management app.",
    link: { href: "https://getselectable.com", label: "getselectable.com" },
  },
  {
    name: "Eka",
    description:
      "A stateful AI agent with persistent memory, and a blog it writes itself.",
    link: { href: "https://eka.weiyen.net", label: "eka.weiyen.net" },
  },
  {
    name: "The unofficial Guardian crossword archives",
    description:
      "The Guardian cryptic crosswords, but with a more mobile-friendly interface.",
    link: {
      href: "https://unofficial-guardian-crossword-app.pages.dev/",
      label: "unofficial-guardian-crossword-app.pages.dev",
    },
  },
];

export const meta = () => [
  { title: "Projects — Wei Yen" },
  {
    name: "description",
    content: "A selection of projects I've worked on.",
  },
];

export default function Projects() {
  return (
    <>
      <section className="home-hero">
        <div />
        <div>
          <h1>
            Things I&apos;ve <em>built</em>.
          </h1>
          <p className="lede">
            A selection of projects I&apos;m proud to show to the world —
            software, side experiments, and the occasional tool that outgrew a
            weekend.
          </p>
        </div>
      </section>

      <div className="section-head">
        <span className="kicker">01 / projects</span>
        <h2>Built &amp; shipped</h2>
      </div>

      <ul className="project-grid">
        {projects.map((project) => (
          <li key={project.name} className="project-card">
            <span className="project-name">{project.name}</span>
            <span className="project-desc">{project.description}</span>
            <a
              className="project-link"
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="section-head">
        <span className="kicker">02 / tools</span>
        <h2>
          Small <em>tools</em>
        </h2>
      </div>
      <ul className="project-grid">
        <li className="project-card">
          <span className="project-name">Keyboard Event Viewer</span>
          <span className="project-desc">
            A tool to view keyboard events in the browser.
          </span>
          <Link className="project-link" to="/projects/key-event-viewer">
            open tool
          </Link>
        </li>
        <li className="project-card">
          <span className="project-name">SQL AST Parser</span>
          <span className="project-desc">
            A tool to show the AST of a SQL statement.
          </span>
          <Link className="project-link" to="/projects/sql-ast-parser">
            open tool
          </Link>
        </li>
        <li className="project-card">
          <span className="project-name">Hotpot</span>
          <span className="project-desc">
            A command-line alternative to Google Authenticator for managing 2FA
            tokens.
          </span>
          <a
            className="project-link"
            href="https://github.com/yen223/hotpot"
            target="_blank"
            rel="noreferrer"
          >
            github/yen223/hotpot
          </a>
        </li>
      </ul>
    </>
  );
}
