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

// Obtained from https://lucide.dev/icons/link/
// Used Claude to convert SVG to hastscript
const linkSvg = h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-link inline",
  },
  [
    h("path", {
      d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    }),
    h("path", {
      d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    }),
  ]
);

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
        figcaption: { className: "text-md text-zinc-500 dark:text-zinc-400" },
      },
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      content: h(
        "",
        {
          className:
            "ml-2 text-zinc-500 no-underline hover:text-zinc-900 dark:hover:text-cyan-300 w-4 h-4 inline",
        },
        linkSvg
      ),
      properties: {
        className: "no-underline hover:underline underline-offset-4",
      },
    })
    .use(rehypeStringify)
    .process(content);
}
