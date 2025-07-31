---
title: "Avoid capital letters in Postgres names"
slug: "avoid-capital-letters-in-postgres-names"
date: "2024-11-03"
published: true
tags:
  - sql
  - database
description: "Because Postgres have counterintuitive rules around case."
---

In Postgres, if you create a table with a camelCase name, you will not be able to reference the table without quoting the name.

```sql
CREATE TABLE "camelCaseTable" (
    id SERIAL PRIMARY KEY,
    name TEXT
);

SELECT * FROM camelCaseTable; -- ERROR: relation "camelcasetable" does not exist
SELECT * FROM "camelCaseTable"; -- WORKS
```

In Postgres, identifiers (i.e. names of tables, columns and other database objects) are case-sensitive. A table named `camelCaseTable` is different from a table named `camelcasetable`.

According to the docs:

> Quoting an identifier also makes it case-sensitive, whereas unquoted names are always folded to lower case. For example, the identifiers FOO, foo, and "foo" are considered the same by PostgreSQL, but "Foo" and "FOO" are different from these three and each other. (The folding of unquoted names to lower case in PostgreSQL is incompatible with the SQL standard, which says that unquoted names should be folded to upper case. Thus, foo should be equivalent to "FOO" not "foo" according to the standard. If you want to write portable applications you are advised to always quote a particular name or never quote it.)
>
> Source: [Postgres docs](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#:~:text=Quoting%20an%20identifier,never%20quote%20it.%29)

An unquoted identifier in any SQL statement is "folded" to a lowercased version of itself. So these two queries are effectively the same:

```sql
-- Both will select from the table "camelcasetable".
SELECT * FROM camelCaseTable;
SELECT * FROM camelcasetable;
```

A quoted identifier always preserves the case. So these two queries are different:

```sql
-- These are different!
SELECT * FROM "camelCaseTable";
SELECT * FROM "camelcasetable";
```

That's why the original example fails. The created table has name `camelCaseTable` with the capital letters, but the select query was looking for a table named `camelcasetable`, all lowercase.

Note that this applies to all identifiers in Postgres, so all of this applies to column names, index names and generally names of database objects.

This is why I recommend avoiding capital letters in Postgres table names. Avoiding capital letters in your naming convention will remove an entire class of complexity stemming from case-sensitivity rules.
