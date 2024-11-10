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

## Cloudflare free-tier limit

There is a daily limit of 100,000 requests on the free tier of Cloudflare Workers + Pages.

I learned this the hard way, thanks to a recent article making it to #2 on [Hacker News](https://news.ycombinator.com/item?id=42057431), and getting about 108,000 page views in a day, causing the site to hit its quota and go offline for about 2 hours.