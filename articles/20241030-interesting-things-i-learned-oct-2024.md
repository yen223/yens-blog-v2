---
title: "Interesting things I've learned: Oct 2024"
slug: "interesting-things-i-learned-oct-2024"
date: "2024-10-30"
published: true
tags:
  - TIL
  - Postgres
  - SQL
  - LLMs
description: "This article contains a collection of interesting things I've learned while working on my projects."
---

This is a random collection of interesting things I've learned while working on my projects, in October 2024.

## PostgresQL JDBC driver in Android

If for [some reason](https://getselectable.com) you need to connect to a Postgres database directly from an Android app, there's good news and bad news:

The good news: JDBC actually works in Android.

The bad news: the latest PostgresQL JDBC driver does not compile on Android.

PostgresQL version 42.2.10 and above are broken on Android, as they have a dependency on `java.lang.management.ManagementFactory`, which doesn't exist in Android's ART runtime.

The solution: use [PostgresQL 42.2.9](https://mvnrepository.com/artifact/org.postgresql/postgresql/42.2.9), which does work on Android.

## Postgres text vs binary formats

When establishing a connection to Postgres, you can specify the format of the data sent from the server to the client using the `Format` code.

Broadly speaking, there are two formats:

> The text representation of values is whatever strings are produced and accepted by the input/output conversion functions for the particular data type. In the transmitted representation, there is no trailing null character; the frontend must add one to received values if it wants to process them as C strings. (The text format does not allow embedded nulls, by the way.)

> Binary representations for integers use network byte order (most significant byte first). For other data types consult the documentation or source code to learn about the binary representation. Keep in mind that binary representations for complex data types might change across server versions; the text format is usually the more portable choice.

[Source](https://www.postgresql.org/docs/current/protocol-overview.html#PROTOCOL-FORMAT-CODES)

I learned this while attempting to port [Selectable](https://getselectable.com) to iOS. The binary format is more efficient if you know, ahead of time, what kind of data you're going to be dealing with. However, that is not the case for a general-purpose database-management app like Selectable.

iOS libraries for database connections are scarce, fortunately Vapor's [PostgresNIO](https://github.com/vapor/postgres-nio) works well in iOS. Unfortunately, PostgresNIO defaults to using the binary format. I had to [fork the library](https://github.com/selectable-app/postgres-nio) and replace the default format with text.

## Postgres schema introspection

To find out what tables are available, you can query either

- the `information_schema` views, or
- the `pg_catalog` views.

`information_schema` is more portable across database systems. `pg_catalog` is more efficient, but it's Postgres-specific.

## psql

`psql -E` will print SQL statements used to generate results for introspection queries (e.g. `\d`, `\d+`, `\dt`, etc.).

This is very useful for when trying to understand how the `pg_catalog` views work.

## Cursed SQL statements

`SELECT from some_table;` &mdash; without selecting any columns &mdash; is a valid SQL statement. It returns one empty row per row in `some_table`.

`SELECT;` is also a valid SQL statement. This returns one empty row.

## LLMs for automation

Claude Sonnet 3.5 is great at writing shell scripts and Github actions, which is great because I am not good at either.

I've managed to get it to write a Github action that will let me a) bump the version of my Android app and b) commit and push the changes to the repo.

## LLMs for generating icons

LLM icon generation are extremely hit-or-miss. I found that I got better results by getting the LLM to generate an SVG of the icon, which tends to result in a more structured and therefore more polished-looking icon.
