import { parse } from "pgsql-parser";

import { data } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export const meta = () => [
  { title: "SQL AST Parser — Wei Yen" },
  {
    name: "description",
    content: "Paste a SQL statement and inspect its abstract syntax tree.",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const sql = formData.get("sql");

  if (typeof sql !== "string") {
    return data(
      { sql: "", ast: null, error: "SQL query is required" },
      { status: 400 }
    );
  }

  try {
    const parsed = parse(sql);
    return data({ sql, ast: parsed, error: null });
  } catch (err) {
    return data(
      {
        sql,
        ast: null,
        error: err instanceof Error ? err.message : "Failed to parse SQL",
      },
      { status: 400 }
    );
  }
}

export default function SQLASTViz() {
  const {
    sql = "",
    ast,
    error: actionError,
  } = useActionData<typeof action>() ?? {};

  return (
    <>
      <section className="home-hero">
        <div />
        <div>
          <h1>
            SQL <em>AST parser</em>
          </h1>
          <p className="lede">
            Paste a SQL statement below and inspect its abstract syntax tree —
            powered by{" "}
            <a href="https://github.com/pyramation/pgsql-parser">pgsql-parser</a>
            .
          </p>
        </div>
      </section>

      <div className="section-head">
        <span className="kicker">
          <span className="arrow" aria-hidden="true" />
          tool
        </span>
        <h2>
          Parse <em>SQL</em>
        </h2>
      </div>

      <div className="tool-wrap">
        <form method="post">
          <textarea
            name="sql"
            defaultValue={sql}
            className="tool-textarea"
            placeholder="SELECT id, name FROM users WHERE active = true;"
          />
          <div className="tool-row">
            <button type="submit" className="tool-button">
              Parse SQL
            </button>
          </div>
        </form>

        {actionError ? <div className="tool-error">{actionError}</div> : null}

        {ast ? (
          <>
            <h3 className="tool-section-title">Abstract syntax tree</h3>
            <pre className="tool-ast">{JSON.stringify(ast, null, 2)}</pre>
          </>
        ) : null}
      </div>
    </>
  );
}
