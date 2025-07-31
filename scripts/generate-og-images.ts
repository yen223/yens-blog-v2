import { getCachedArticles } from "../app/lib/articles.server";
import { generateOgImage } from "../app/components/OGGraphImage";
import fs from "fs/promises";
import path from "path";

async function main() {
  try {
    // Get all articles
    const articles = await getCachedArticles();

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), "public/articles");
    await fs.mkdir(outputDir, { recursive: true });

    // Generate OG images for each article
    for (const article of articles) {
      console.log(`Generating OG image for ${article.slug}...`);

      // Create article directory
      const articleDir = path.join(outputDir, article.slug);
      await fs.mkdir(articleDir, { recursive: true });

      // Generate OG image
      const imageBuffer = await generateOgImage({
        title: article.title,
        date: article.date,
        description: article.description,
      });

      // Save image
      await fs.writeFile(path.join(articleDir, "oggraph.png"), imageBuffer);
    }

    console.log("OG image generation complete!");
  } catch (error) {
    console.error("Error generating OG images:", error);
    process.exit(1);
  }
}

main();
