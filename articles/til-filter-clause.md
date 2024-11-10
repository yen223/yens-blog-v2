---
title: "TIL: The FILTER clause in SQL"
slug: "til-filter-clause"
date: "2024-11-10"
published: true
tags:
  - TIL
  - Postgres
  - SQL
description: "A useful SQL keyword that I didn't know about until recently."
---

_( H/T [@winand.at](https://bsky.app/profile/winand.at/post/3lagizjuo4e2y) )_

In SQL, if you wanted to perform two or more aggregations with different filters, you might be able to use the `FILTER` clause.

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

`FILTER` is supported in Postgres 9.4 and above, and in sqlite. It is unfortunately not widely supported in other databases.