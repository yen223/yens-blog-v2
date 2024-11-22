import type { Article } from "~/lib/types";

/**
 * OG Graph Images (Open Graph Images) are the preview images that appear when sharing links
 * on social media platforms like Twitter, Facebook, or LinkedIn. They provide a visual
 * representation of the content and help make shared links more engaging and informative.
 * These images typically include the article title, description, and branded visual elements
 * to maintain consistent styling across social shares.
 */

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