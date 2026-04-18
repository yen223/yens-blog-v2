import { ReactNode } from "react";

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="home-hero">
        <div />
        <div>
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
        </div>
      </section>
      {children && <div>{children}</div>}
    </>
  );
}
