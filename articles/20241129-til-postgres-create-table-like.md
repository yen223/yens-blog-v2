---
title: "CREATE TABLE ... LIKE in Postgres"
slug: "til-postgres-create-table-like"
date: "2024-11-29"
published: true
tags:
  - TIL
  - Postgres
description: "A quick way to copy a table's structure"
---

Suppose you already have a `users` table ...

```sql
CREATE TABLE users (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
```

... and now you want to create a `users_history` table to track changes that happen to users. Suppose `users_history` shares the same columns as `users`.

You can achieve this using the `LIKE` clause ([docs](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-PARMS-LIKE)).

```sql
-- Create a new table with the same columns as `users`
CREATE TABLE users_history (LIKE users);
```

Note that you can specify additional columns:

```sql
-- Create a new table with the same columns as `users`,
-- but that also tracks modification time and modification type
CREATE TABLE users_history (
  LIKE users,
  modified_at timestamptz NOT NULL,
  change_type text NOT NULL
);
```

There is no way to exclude columns. The easiest workaround is to drop the column immediately after creation:

```sql
-- Create a new table with the same columns as `users`
-- but without `created_at`
CREATE TABLE users_history (LIKE users);
ALTER TABLE users_history DROP COLUMN created_at;
```

By default, `LIKE` only copies over column names and types. By specifying the optional setting `INCLUDING <x>`, you can also copy over specified properties:

```sql
-- Copy over everything mentioned below
CREATE TABLE users_history (LIKE users INCLUDING ALL);

-- Copy over comments
CREATE TABLE users_history (LIKE users INCLUDING COMMENTS);

-- Copy over the compression method of the columns
CREATE TABLE users_history (LIKE users INCLUDING COMPRESSION);

-- Copy over CHECK constraints
CREATE TABLE users_history (LIKE users INCLUDING CONSTRAINTS);

-- Copy over column defaults
CREATE TABLE users_history (LIKE users INCLUDING DEFAULTS);

-- Copy over generation expressions of copied columns
CREATE TABLE users_history (LIKE users INCLUDING GENERATED);

-- Copy over identity specifications of copied columns
CREATE TABLE users_history (LIKE users INCLUDING IDENTITY);

-- Copy over indexes, as well as primary key, unique, and exclude constraints
CREATE TABLE users_history (LIKE users INCLUDING INDEXES);

-- Copy over extended statistics
CREATE TABLE users_history (LIKE users INCLUDING STATISTICS);

-- Copy over storage settings
CREATE TABLE users_history (LIKE users INCLUDING STORAGE);
```

You can also specify `EXCLUDING <x>` to exclude certain properties. This is most useful when used in conjunction with `INCLUDING ALL`

```sql
-- Copy over everything, except for indexes and
-- primary key + unique + exclude constraints
CREATE TABLE users_history (LIKE users INCLUDING ALL EXCLUDING INDEXES);
```

Note that `CREATE TABLE ... LIKE` does not create a link between the old table and the new table. If you alter the old table's columns, the new table does not get affected.

`CREATE TABLE ... LIKE` is supported in Postgres 7.4 and newer.
