import { Link } from "@remix-run/react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <div>© 2021 — {year}</div>
      <div className="colophon">
        Set in <span>Figtree</span>, <span>Source Serif 4</span>, and{" "}
        <span>JetBrains Mono</span>. Built with{" "}
        <a href="https://remix.run">Remix</a>. This site is{" "}
        <a href="https://github.com/yen223/yens-blog-v2">open source</a>. No
        trackers, no analytics, no soup for you.
      </div>
      <div className="foot-links">
        <Link to="/articles">articles</Link>
        <Link to="/projects">projects</Link>
        <Link to="/about">about</Link>
        <a href="/feed/all">rss</a>
      </div>
    </footer>
  );
}
