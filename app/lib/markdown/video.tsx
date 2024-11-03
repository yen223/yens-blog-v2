type VideoProps = {
    url: string;
};

export function Video({ url }: VideoProps) {
    return (
        <video src={url} controls></video>
    );
}

export const video = {
    render: "Video",
    attributes: { url: { type: String } }
};