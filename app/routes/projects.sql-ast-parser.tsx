import { parse, deparse } from "pgsql-parser";

import { data } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-100">
        SQL AST Visualizer
      </h1>

      <form method="post" className="mb-4">
        <textarea
          name="sql"
          defaultValue={sql}
          className="w-full h-32 p-2 border rounded shadow-md shadow-zinc-800/5
                             border-zinc-700 bg-zinc-700/[0.15]
                             text-zinc-200 placeholder:text-zinc-500
                             focus:border-teal-400 focus:outline-none focus:ring-4
                             focus:ring-teal-400/10"
          placeholder="Enter SQL statement here..."
        />
        <button
          type="submit"
          className="mt-4 bg-zinc-700 text-zinc-100 px-4 py-2 rounded
                             hover:bg-zinc-600 active:bg-zinc-700 active:text-zinc-100/70"
        >
          Parse SQL
        </button>
      </form>
      {actionError && (
        <div
          className="mt-4 p-4 bg-red-100/10 border border-red-400/20
                               text-red-400 rounded"
        >
          {actionError}
        </div>
      )}
      {ast && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-zinc-100">
            Abstract Syntax Tree:
          </h2>
          <pre
            className="bg-zinc-800/90 p-4 rounded overflow-auto
                                  text-zinc-300 border
                                  border-zinc-700/40"
          >
            {JSON.stringify(ast, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
