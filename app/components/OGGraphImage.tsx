import type { Article } from "~/lib/types";
import puppeteer from "puppeteer";

/**
 * OG Graph Images (Open Graph Images) are the preview images that appear when sharing links
 * on social media platforms like Twitter, Facebook, or LinkedIn. They provide a visual
 * representation of the content and help make shared links more engaging and informative.
 * These images typically include the article title, description, and branded visual elements
 * to maintain consistent styling across social shares.
 */


interface OgImageParams {
    title: string;
    date: string;
    description: string;
}

export async function generateOgImage({
    title,
    date,
    description,
}: OgImageParams): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();

    // Set viewport to common OG image size
    await page.setViewport({
        width: 1200,
        height: 630,
        deviceScaleFactor: 2,
    });

    const html = `
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            font-family: 'Figtree', sans-serif;
          }
        </style>
      </head>
      <body>
        <div style="width: 1200px; height: 630px;">
          <div class="w-[1200px] h-[630px] absolute bg-black text-white overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
              <defs>
                <pattern id="darkGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" stroke-width="1" />
                </pattern>
                <linearGradient id="darkFadeGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#111827" />
                  <stop offset="100%" stop-color="#1f2937" />
                </linearGradient>
                <radialGradient id="glowBlue" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
                </radialGradient>
                <radialGradient id="glowPurple" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.2" />
                  <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="630" fill="url(#darkFadeGradient)" />
              <rect width="1200" height="630" fill="url(#darkGrid)" />
              <circle cx="1000" cy="100" r="200" fill="url(#glowBlue)" />
              <circle cx="200" cy="500" r="160" fill="url(#glowPurple)" />
              <path d="M 900 50 L 1100 150" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.3" />
              <path d="M 150 450 L 250 550" stroke="#8b5cf6" stroke-width="1.5" stroke-opacity="0.3" />
              <circle cx="900" cy="50" r="3" fill="#3b82f6" fill-opacity="0.8" />
              <circle cx="1100" cy="150" r="3" fill="#3b82f6" fill-opacity="0.8" />
              <circle cx="150" cy="450" r="3" fill="#8b5cf6" fill-opacity="0.8" />
              <circle cx="250" cy="550" r="3" fill="#8b5cf6" fill-opacity="0.8" />
            </svg>
            <div style="position: absolute; inset: 0; padding: 32px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 30%, transparent 100%);">
              <div style="max-width: 72rem; padding-bottom: 64px;">
                <h2 style="font-size: 48px; font-weight: bold; margin-bottom: 16px; color: white;">${title}</h2>
                <p style="font-size: 24px; opacity: 0.9; color: white;">${description}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

    await page.setContent(html);
    const imageBuffer = await page.screenshot({
        type: "png",
        clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    await browser.close();

    return imageBuffer;
}

// TODO: This is not used in the actual OG image generation. Because the image generation 
// uses raw HTML, and doesn't have access to Tailwind styling.
// This is just here for reference
function OGGraphImageBackground() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
      <defs>
        <pattern id="darkGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" stroke-width="1" />
        </pattern>
        <linearGradient id="darkFadeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#1f2937" />
        </linearGradient>
        <radialGradient id="glowBlue" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glowPurple" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="630" fill="url(#darkFadeGradient)" />
      <rect width="1200" height="630" fill="url(#darkGrid)" />
      <circle cx="1000" cy="100" r="200" fill="url(#glowBlue)" />
      <circle cx="200" cy="500" r="160" fill="url(#glowPurple)" />
      <path d="M 900 50 L 1100 150" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.3" />
      <path d="M 150 450 L 250 550" stroke="#8b5cf6" stroke-width="1.5" stroke-opacity="0.3" />
      <circle cx="900" cy="50" r="3" fill="#3b82f6" fill-opacity="0.8" />
      <circle cx="1100" cy="150" r="3" fill="#3b82f6" fill-opacity="0.8" />
      <circle cx="150" cy="450" r="3" fill="#8b5cf6" fill-opacity="0.8" />
      <circle cx="250" cy="550" r="3" fill="#8b5cf6" fill-opacity="0.8" />
    </svg>
  )
}

export function OGGraphImage({ article }: { article: Article }) {
  return (
    <div className="w-[1200px] h-[630px] absolute bg-black text-white overflow-hidden">
      <OGGraphImageBackground />
      <div className="top-0 left-0 absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/80 via-30% to-transparent">
        <div className="max-w-4xl pb-16">
          <h2 className="text-4xl font-bold mb-4">{article.title}</h2>
          <p className="text-lg opacity-90">{article.description}</p>
        </div>
      </div>
    </div>
  )
} 