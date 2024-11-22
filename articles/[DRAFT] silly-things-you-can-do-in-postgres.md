---
title: "Silly things you can do in Postgres"
slug: "silly-things-you-can-do-in-postgres"
date: "2024-11-20"
published: false
tags:
  - TIL
  - Postgres
description: "Please do this in production and let me know how it goes."
---

## Put emojis in table names

As long as the Postgres server uses UTF-8 as its encoding, you can create a table with emojis as the name.

```sql
CREATE TABLE 💩😀🤔 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

INSERT INTO 💩😀🤔 (name) VALUES ('poop');
-- INSERT 0 1

SELECT * FROM 💩😀🤔;
/*
                 id                  | name 
--------------------------------------+------
 557a3a16-e054-40dd-a669-33f9cb304dae | poop
(1 row)
*/
```

Notice that you don't need to quote the emoji name. Given that there's no case-folding with emojis, emojis are superior to [uppercase letters in table names](/articles/avoid-capital-letters-in-postgres-names) in one respect.

There are surprisingly few restrictions to what you can name your tables:

- Quoted identifiers can contain any character, including spaces and punctuation. `This is a valid identifier!!` is a valid identifier, so long as it's quoted with double quotes.
- The length of an identifier is restricted to `NAMEDATALEN` - 1 bytes. `NAMEDATALEN` is 63 by default, but can be set at compile time.

## Leave off spaces in queries

This is a valid query:

```sql
select*from"employees"where"employee_id"='1'and"last_name"='Davolio';
```

The Postgres tokeniser doesn't require spaces in cases where the tokens are unambiguous. This means with clever use of single and double quotes, you can leave off spaces in queries.

## "Fix" how nulls are handled

You may have run into this before:

```sql

```