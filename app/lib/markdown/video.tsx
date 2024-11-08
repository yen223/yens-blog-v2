type VideoProps = {
    src: string;
    controls?: boolean;
    className?: string;
};


export function Video({ src, controls = true, className }: VideoProps) {
    return (
        <div className={"flex flex-row justify-center"}>
            <video src={src} controls={controls} className="max-h-[768px]"></video>
        </div>
    );
}

export const video = {
    render: "Video",
    attributes: { src: { type: String } }
};
