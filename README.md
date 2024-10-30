# Yen's Blog

This codebase hosts my personal blog.

The blog is built with [Remix](https://remix.run/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

Articles are written in Markdown and stored in the `app/articles` directory.

## Publishing new articles

1. Add the new article to the `app/articles` directory.
2. Push to the `main` branch. There's a GitHub Actions workflow that will automatically build and deploy the blog to Cloudflare Pages.

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

