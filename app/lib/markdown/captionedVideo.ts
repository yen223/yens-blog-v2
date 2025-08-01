import { h } from "hastscript";
import { type ElementContent } from "hast";
import { type ComponentFunction } from "rehype-components";

type VideoProps = {
  src: string;
  controls?: boolean;
  caption?: string;
  className?: string;
};

export const CaptionedVideo: ComponentFunction = (props, children) => {
  const { caption } = props as VideoProps;
  return h("figure", { className: "flex flex-col items-center" }, [
    h("video", { ...props, className: "max-h-[768px]", controls: true }),
    h(
      "figcaption",
      { className: "text-md text-zinc-400 mt-2" },
      caption
    ),
  ]) as ElementContent;
};
