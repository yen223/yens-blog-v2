---
title: "A few interesting Postgres features"
slug: "interesting-postgres-features"
date: "2024-12-02"
published: true
tags:
  - TIL
  - Postgres
description: "Postgres features that may fly under the radar."
---

## The COMMENT ON statement

`COMMENT ON` can be used to add comments to tables, columns, indexes, and other database entities.

```sql
COMMENT ON TABLE users IS 
  'This table is deprecated. Please use the users_v2 table instead.';
COMMENT ON COLUMN users.name IS 'The full name of the user';
```

SQL clients can pick up on these comments, and display them whenever you're browsing the database schema. In `psql`, you can view tables with comments using `\d+`

![Datagrip showing table comment][1]

Comments are stored in the `pg_catalog.pg_description` table. 

`COMMENT ON` is supported in all versions of Postgres ([docs](https://www.postgresql.org/docs/current/sql-comment.html)).


## num_nonnulls and num_nulls

`num_nonnulls(...)` counts the number of provided arguments that are not null. 

```sql
SELECT num_nonnulls('a', 'b', null); 
-- Returns 2
```

`num_nulls(...)` counts the number of provided arguments that are null.

```sql
SELECT num_nulls('a', 'b', null); 
-- Returns 1
```

This is useful in a check constraint, if you need to ensure that exactly some number of columns are provided

```sql
CREATE TABLE purchase_order (
    id UUID PRIMARY KEY,
    contact_email TEXT NULL,
    contact_phone TEXT NULL
);

-- If we want to ensure that at least one of email or phone is provided 
-- when making a purchase order, we can add a check constraint using 
-- `num_nonnulls`
ALTER TABLE purchase_order ADD CONSTRAINT contact_info_check CHECK (
    num_nonnulls(contact_email, contact_phone) >= 1
);
```

`num_nonnulls` and `num_nulls` are available in Postgres 9.6+ ([docs](https://www.postgresql.org/docs/9.6/functions-comparison.html#:~:text=Table%209%2D3.%20Comparison%20Functions))


## The FILTER clause

In Postgres, if you wanted to perform two or more aggregations with different filters, you might be able to use the `FILTER` clause.

```sql
SELECT 
    count(*) as user_count,
    count(*) filter (where verified = true) as verified_user_count
FROM users;
```

is the equivalent of:

```sql
SELECT 
    count(*) as user_count,
    sum(case when verified = true then 1 else 0 end) as verified_user_count
FROM users;
```

except that a) it reads more naturally, and b) you don't need to write a complicated `case` expression.

`FILTER` is supported in Postgres 9.4 and above ([docs](https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-AGGREGATES:~:text=then%20only%20the%20input%20rows%20for%20which%20the-,filter_clause,-evaluates%20to%20true%20are%20fed%20to%20the%20aggregate)).

## CREATE TABLE ... LIKE

If you want to create a table with the same columns as an existing table, there is a shorthand for this: `CREATE TABLE ... LIKE`.

```sql
CREATE TABLE users (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- This creates a users_history table with the same columns as the users table, 
-- but with additional columns
CREATE TABLE users_history (
  LIKE users INCLUDING ALL, 
  modified_at timestamptz NOT NULL, 
  modification_type text NOT NULL
);
```

You can optionally add `INCLUDING` and `EXCLUDING` clauses to control what else gets copied over.

I've written about this in more detail [here](til-postgres-create-table-like)

`CREATE TABLE ... LIKE` is supported in Postgres 7.4 and newer ([docs](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-PARMS-LIKE))

## date_bin()

The `date_bin` function can be used to bin a timestamp to some given interval, aligned to the specified origin.

`date_bin(stride, source, origin)` takes three arguments:

1. `stride` - The length of the interval to align to. This is of type `interval`.
2. `source` - The timestamp to align. This is of type `timestamp` or `timestamptz`.
3. `origin` - The start of the first interval. This is of type `timestamp` or `timestamptz`.

```sql

-- This returns the start of the nearest 10-minute interval that each event_time 
-- belongs to, starting from 13:02:00.
SELECT 
  event_time,
  date_bin(
    '10 minutes', -- Interval length
    event_time, -- Timestamp to align
    TIMESTAMP '2024-12-02 13:02:00' -- Start of the first interval
  )
FROM 
  (VALUES 
    (TIMESTAMP '2024-12-02 14:24:00'),
    (TIMESTAMP '2024-12-02 14:26:00'),
    (TIMESTAMP '2024-12-02 14:35:12'),
    (TIMESTAMP '2024-12-02 14:37:12'),
    (TIMESTAMP '2024-12-02 14:45:45')
  ) AS t(event_time);

/*
     event_time      |      date_bin       
---------------------+---------------------
 2024-12-02 14:24:00 | 2024-12-02 14:22:00
 2024-12-02 14:26:00 | 2024-12-02 14:22:00
 2024-12-02 14:35:12 | 2024-12-02 14:32:00
 2024-12-02 14:37:12 | 2024-12-02 14:32:00
 2024-12-02 14:45:45 | 2024-12-02 14:42:00
*/
```

This is very useful when building histograms from time-series data.

The difference between `date_bin` and the more traditionally-used `date_trunc` is that `date_bin` lets you align timestamps to any arbitrary interval.

`date_bin` is available in Postgres 14+ ([docs](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-BIN))

[1]: /articles/interesting-postgres-features/comment-on-screenshot.png "Datagrip showing table comment"
