---
title: "Initial thoughts on using Cursor"
slug: "initial-thoughts-on-using-cursor"
date: "2024-10-31"
published: true
tags:
  - Cursor
  - LLMs
description: "This article contains my initial thoughts on using Cursor, an AI-powered code editor."
---

I do not know how to write Vite plugins. Thanks to Cursor, I've made [one](https://github.com/yen223/yens-blog-v2/blob/5d150c2fd63a542de14c0f9b85602773609e4b14/app/lib/vite-plugin-articles.ts) in about 5 minutes.

[Cursor](https://www.cursor.com/) is an "AI-powered code editor". There was some initial hype about it, but I decided to give it a go yesterday.

Articles in this blog are written in Markdown, and are stored in the `articles` directory.
As part of rebuilding this blog, I wanted to experiment with pre-loading all the articles in the Remix server on startup, in order to speed 
up page load time. 

My initial approach was to write a function that would load all files in the `articles` directory via `import.meta.glob`. 
Unfortunately, this caused the site to hit a startup CPU limit on deployment.

So instead, I decided to compile all the articles into a single file at build time, and import them in the server. This is theoretically a much faster process, 
as it avoids the overhead of dynamic imports at runtime. This basically meant I needed to write a Vite plugin.

I have no experience writing Vite plugins. I know how to use Vite plugins, and I know how they work in principle. But I've never had 
reason to write one, and so I've never taken the time to learn how. But that didn't matter. I just asked Cursor to write a Vite plugin for me, 
and it did. 

![Cursor writing a Vite plugin][1]

Worked on the first attempt too, which was a pleasant surprise.

As a long-term user of Jetbrains products, I was fairly skeptical about LLMs for programming. Claude could generate code reasonably well,
but lacking the context of the project meant I had to do a lot more heavy lifting to make Claude-generated code work. This wasn't the case
with Cursor.

I will daily-drive Cursor in the coming weeks before making any final judgements, but I am cautiously optimistic about the future of AI-driven IDEs.

[1]: /images/cursor-writing-vite-plugin.png "Cursor writing a Vite plugin"