type ImageProps = {
    src: string;
    alt: string;
    title?: string;
};

export function Image({ src, alt, title }: ImageProps) {
    return (
        <figure className="flex flex-col items-center">
            <img src={src} alt={alt} title={title} />
            <figcaption>{title}</figcaption>
        </figure>
    );
}

export const image = {
    render: "Image",
    attributes: { src: { type: String }, alt: { type: String }, title: { type: String } }
};