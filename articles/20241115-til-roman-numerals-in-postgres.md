---
title: "Interesting things I've learned: Roman numerals in Postgres"
slug: "til-roman-numerals-in-postgres"
date: "2024-11-15"
published: true
tags:
  - TIL
  - Postgres
description: "I have XCIX problems, but Roman numerals ain't one"
---

There is a built-in way to convert numbers to Roman numerals in Postgres.

`to_char` ([docs](https://www.postgresql.org/docs/current/functions-formatting.html)) is a function in Postgres that converts a number to a string in a given format. One of the formats it supports is `'RN'`, which converts a number to a Roman numeral.

```sql
SELECT to_char(1234, 'RN');
-- Returns "MCCXXXIV"
```

Note that it only supports numbers between 1 and 3999.

```sql
SELECT to_char(4000, 'RN');
-- Returns ###############
```
