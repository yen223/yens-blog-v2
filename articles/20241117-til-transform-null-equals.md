---
title: "The transform_null_equals configuration in Postgres"
slug: "til-transform-null-equals"
date: "2024-11-17"
published: true
tags:
  - TIL
  - Postgres
description: "How to make null = null evaluate to true in Postgres"
---

It is a well-known fact that you should always use `IS NULL` instead to test if some value is null. That is because `NULL = NULL` does not evaluate to true in SQL, instead it evaluates to `NULL`. 

However, if you insist on violating SQL standards and making `NULL = NULL` be true, you can. There's a runtime configuration option for that: `transform_null_equals` ([docs](https://www.postgresql.org/docs/17/runtime-config-compatible.html#GUC-TRANSFORM-NULL-EQUALS)).

```sql
SELECT NULL = NULL;
-- Returns NULL

SET transform_null_equals TO true;

SELECT NULL = NULL;
-- Returns TRUE
```

**Should you use this option? No.** 

This only works for specifically `= NULL` constructions. In particular, `NULL != NULL` will still return `NULL` instead of `FALSE`, and `NULL IN (1, NULL, 2)` will not return `TRUE`, even with the option enabled. But it's there if you need it.

`transform_null_equals` is off by default, and is available in all versions of Postgres.