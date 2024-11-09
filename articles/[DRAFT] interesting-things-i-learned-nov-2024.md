---
title: "Interesting things I've learned: Nov 2024"
slug: "interesting-things-i-learned-nov-2024"
date: "2024-11-09"
published: false
tags:
  - TIL
  - Postgres
  - SQL
  - LLMs
description: "This article contains a collection of interesting things I've learned while working on my projects."
---

## The FILTER clause in SQL
( H/T [@winand.at](https://bsky.app/profile/winand.at/post/3lagizjuo4e2y))

```sql
SELECT 
    count(*) as user_count,
    count(*) filter (where age > 18) as adult_user_count
FROM users;
```

is the equivalent of:

```sql
SELECT 
    count(*) as user_count,
    sum(case when age > 18 then 1 else 0 end) as adult_user_count
FROM users;
```

except that you don't need to write a complicated `case` expression.

## Cloudflare free-tier limit

There is a 100,000-request daily limit on the free tier of Cloudflare Workers + Pages.

I learned this the hard way, thanks to a recent article making it to #2 on [Hacker News](https://news.ycombinator.com/item?id=42057431), and getting about 108,000 page views in a day.