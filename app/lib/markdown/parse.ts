import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeComponents from "rehype-components";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { CaptionedVideo } from "./captionedVideo";
import { rehypeSemanticImage } from "./semanticImages";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { h } from "hastscript";

export async function parseMarkdown(content: string) {
  return await unified()
    // Take Markdown as input and turn it into MD syntax tree
    .use(remarkParse)
    // Add support for frontmatter in Markdown
    .use(remarkFrontmatter, ["yaml"])
    // Prase and validate Markdown frontmatter (YAML)
    .use(remarkParseFrontmatter)
    .use(remarkRehype, {
      // Necessary for support HTML embeds (see next plugin)
      allowDangerousHtml: true,
    })
    .use(rehypeRaw)
    .use(rehypeComponents, {
      components: {
        "captioned-video": CaptionedVideo,
      },
    })
    .use(rehypePrettyCode, {
      keepBackground: false,
    })
    .use(rehypeSemanticImage, {
      elements: {
        figure: { className: "flex flex-col items-center mt-16 mb-16" },
        figcaption: { className: "text-md text-zinc-400" },
      },
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "prepend",
      content: () => [h("span", { className: "heading-anchor-mark" }, "§")],
      properties: { className: "heading-anchor", ariaLabel: "Link to section" },
    })
    .use(rehypeStringify)
    .process(content);
}
