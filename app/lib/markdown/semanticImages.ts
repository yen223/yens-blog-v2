// This is vendored from https://github.com/benjamincharity/rehype-semantic-images

import { type Root } from "hast";
import { h } from "hastscript";
import { type Plugin } from "unified";
import { visit } from "unist-util-visit";

type HastElement = ReturnType<typeof h>;
export interface RehypeSemanticElement {
    className?: string;
    disable?: boolean;
    id?: string;
};

export type RehypeSemanticElementPermanent = Omit<RehypeSemanticElement, "disable">;

export type RehypeSemanticImages = {
    disableLazy: boolean;
    elements: {
        container?: RehypeSemanticElement;
        figcaption?: RehypeSemanticElement;
        figure?: RehypeSemanticElement;
        img?: RehypeSemanticElementPermanent;
    };
    sizes: string;
    srcSetBuilder?: (url: string) => string;
    urlBuilder?: (url: string) => string;
};

export type RehypeSemanticImagesRequired = {
    disableLazy: boolean;
    elements: {
        container: RehypeSemanticElement;
        figcaption: RehypeSemanticElement;
        figure: RehypeSemanticElement;
        img: RehypeSemanticElementPermanent;
    };
    sizes: string;
    srcSetBuilder: (url: string) => string;
    urlBuilder: (url: string) => string;
};

const defaultOptions: RehypeSemanticImagesRequired = {
    disableLazy: false,
    elements: {
        container: {
            className: "rsi-container",
            disable: false,
        },
        figure: {
            className: "rsi-figure",
            disable: false,
        },
        figcaption: {
            className: "rsi-figcaption",
            disable: false,
        },
        img: {
            className: "rsi-image",
        },
    },
    sizes: "100vw",
    srcSetBuilder: (url) => `${url} 1x`,
    urlBuilder: (url) => url,
};

export const rehypeSemanticImage: Plugin<[Partial<RehypeSemanticImages>?], Root> = (options = {}) => {
    const options_ = mergeOptions(options);

    return (tree) => {
        visit(tree, { tagName: "img" }, (node, index, parent) => {
            if (!parent || typeof index !== "number") return;
            if (!node.properties?.src || typeof node.properties.src !== "string") return;

            const { src, alt } = node.properties;
            const builtSrc = options_.urlBuilder(src);
            const loading = options_.disableLazy ? "eager" : "lazy";
            const srcSet = options_.srcSetBuilder(builtSrc);

            const imgElement = h("img", {
                ...options_.elements.img,
                alt,
                loading,
                sizes: options_.sizes,
                src: builtSrc,
                srcSet,
            });

            const figureChildren: HastElement[] = [];
            if (options_.elements.container.disable) {
                figureChildren.push(imgElement);
            } else {
                const container = h("div", { ...options_.elements.container }, imgElement);
                figureChildren.push(container);
            }

            if (!options_.elements.figure.disable && !options_.elements.figcaption.disable && typeof alt === "string") {
                const figcaption = h("figcaption", { ...options_.elements.figcaption }, alt);
                figureChildren.push(figcaption);
            }

            if (options_.elements.figure.disable) {
                (parent.children as HastElement[]).splice(index, 1, ...figureChildren);
            } else {
                const figure = h("figure", { ...options_.elements.figure }, ...figureChildren);
                (parent.children as HastElement[]).splice(index, 1, figure);
            }
        });
    };
};

export default rehypeSemanticImage;

function mergeOptions(userOptions: Partial<RehypeSemanticImages> = {}): RehypeSemanticImagesRequired {
    return {
        ...defaultOptions,
        ...userOptions,
        elements: {
            ...defaultOptions.elements,
            ...userOptions.elements,
        },
    };
}