import clsx from "clsx";

type VideoProps = {
    src: string;
    controls?: boolean;
    caption?: string;
    className?: string;
};


export function Video({ src, controls = true, className, caption }: VideoProps) {
    return (
        <figure className={clsx("flex flex-col items-center", className)}>
            <video src={src} controls={controls} className="max-h-[768px]"></video>
            {caption && <figcaption className="text-md text-zinc-500 dark:text-zinc-400 mt-2">{caption}</figcaption>}
        </figure>
    );
}

export const video = {
    render: "Video",
    attributes: { src: { type: String }, caption: { type: String } },
    selfClosing: true,
};
