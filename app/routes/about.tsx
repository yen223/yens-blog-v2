import { Link } from "@remix-run/react";
import { BLUESKY_LINK } from "~/constants";

export const meta = () => {
  return [
    { title: "About — Wei Yen" },
    { name: "description", content: "About Wei Yen." },
  ];
};

export default function About() {
  return (
    <section className="about-wrap">
      <aside className="about-side">
        <span className="k">filed under</span>
        <span className="v">human · engineer</span>

        <span className="k">based in</span>
        <span className="v">Sydney, AU</span>

        <span className="k">timezone</span>
        <span className="v">AEST · UTC+10</span>

        <span className="k">elsewhere</span>
        <span className="v plain">
          <a href="https://github.com/yen223">github/yen223</a>
        </span>
        <span className="v plain">
          <a href="https://www.linkedin.com/in/weiyen/">linkedin/weiyen</a>
        </span>
        <span className="v plain">
          <a href={BLUESKY_LINK}>bluesky</a>
        </span>
        <span className="v plain">
          <a href="mailto:hello@weiyen.net">hello@weiyen.net</a>
        </span>

        <span className="k">tending</span>
        <span className="v plain">Selectable</span>
        <span className="v plain">StrataChecks</span>
        <span className="v plain">Eka</span>
      </aside>

      <div className="about-main">
        <h1>
          Hi, I&apos;m <em>Yen</em>
        </h1>

        <p>
          I&apos;m currently working on{" "}
          <a href="https://getselectable.com">Selectable</a> and{" "}
          <a href="https://stratachecks.com">StrataChecks</a>.
        </p>
        <p>
          I also maintain <a href="https://eka.weiyen.net">Eka</a>, a stateful
          AI agent with persistent memory and{" "}
          <a href="https://eka.weiyen.net/posts">a blog</a>.
        </p>
        <p>
          I like <strong>databases</strong>, <strong>programming languages</strong>,{" "}
          <strong>maths</strong>, and <em>wordplay</em>. I was previously a
          software engineer at Rokt, Mathspace, Western Digital and Accenture.
        </p>

        <h2>About this site</h2>
        <p>
          This site is open-source. The code is hosted on{" "}
          <a href="https://github.com/yen223/yens-blog-v2/">GitHub</a>. It&apos;s
          built with <a href="https://remix.run">Remix</a> and hosted on{" "}
          <a href="https://www.digitalocean.com/?refcode=61c4d2b4f1b7&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste">
            DigitalOcean
          </a>{" "}
          (referral link).
        </p>

        <h2>A standing invitation</h2>
        <p>
          If anything here prompts a thought, send it along. I answer{" "}
          <a href="mailto:hello@weiyen.net">every real email</a>. The longer
          ones get a longer reply. Or if you&apos;d rather read, subscribe to
          the <Link to="/feed/all">RSS feed</Link>.
        </p>
      </div>

      <aside aria-hidden="true" />
    </section>
  );
}
