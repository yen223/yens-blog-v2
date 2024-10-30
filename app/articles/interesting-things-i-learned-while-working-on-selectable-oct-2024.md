---
title: "Interesting things I've learned: Oct 2024"
slug: "interesting-things-i-learned-oct-2024"
date: "2024-10-30"
published: false
tags:
  - TIL
  - Postgres
  - SQL
  - LLMs
description: "This article contains a collection of interesting things I've learned while working on my projects."
---

## Postgres 
### Schema introspection
To find out what tables are available, you can query either
  - query the `information_schema` views, or
  - the `pg_catalog` views.

`information_schema` is more portable across database systems. `pg_catalog` is more efficient, but it's Postgres-specific.

### psql
`psql -E` will print SQL statements used to generate results for introspection queries (e.g. `\d`, `\d+`, `\dt`, etc.). 

This is very useful for when trying to understand how the `pg_catalog` views work.

### Cursed SQL statements
`SELECT from some_table;` &mdash; without selecting any columns &mdash; is a valid SQL statement. It returns one empty row per row in `some_table`.

`SELECT;` is also a valid SQL statement. This returns one empty row.

## LLMs
Claude Sonnet 3.5 is great at writing shell scripts and Github actions, which is great because I am not good at either. 

I've managed to get it to write a Github action that will let me a) bump the version of my Android app and b) commit and push the changes to the repo.

