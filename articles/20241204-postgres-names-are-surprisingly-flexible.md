---
title: Postgres names are surprisingly flexible
description: "SELECT * FROM 😱"
slug: "postgres-names-are-surprisingly-flexible"
published: true
date: "2024-12-04"
tags:
  - Postgres
  - SQL
---

As long as the Postgres server uses UTF-8 as its encoding, you can create a table with emojis as the name.

```sql
CREATE TABLE 💩😀🤔 (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL
);

INSERT INTO 💩😀🤔 (name) VALUES ('poop');
-- INSERT 0 1

SELECT * FROM 💩😀🤔;
/*
 id | name 
----+------
  1 | poop
(1 row)
*/
```
Notice that you don't need to quote the emoji name. Given that there's no case-folding with emojis, emojis are superior to [uppercase letters in table names](/articles/avoid-capital-letters-in-postgres-names) in this one respect.

There are surprisingly few restrictions to what you can name your tables:

- Quoted identifiers can contain any character, including spaces and punctuation. 
- The length of an identifier is restricted to `NAMEDATALEN` - 1 bytes. `NAMEDATALEN` is 63 by default, but can be set at compile time.

All of these are valid identifiers, which means you can use them as table names:
- `" "`
- `"This is a valid identifier!!"`
- `表名`
- `"..."`
- `"SELECT"`

Identifiers don't need to be quoted if they "begin with a letter (a-z, but also letters with diacritical marks and non-Latin letters) or an underscore (_)."

All the above rules apply to all identifiers, including column names, index names, and constraint names:

```sql
ALTER TABLE 💩😀🤔
  ADD CONSTRAINT "🚫 empty names! 😤" CHECK (length(name) > 0);
-- This adds a constraint named "🚫 empty names! 😤" to the 💩😀🤔 table.
```

Please don't do this. However if you choose to do this, please tell me all about it.

See [https://www.postgresql.org/docs/current/sql-syntax-lexical.html](https://www.postgresql.org/docs/current/sql-syntax-lexical.html) for more details.