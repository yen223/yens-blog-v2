import { Highlight, themes } from "prism-react-renderer"


type FenceProps = {
  children: string;
  language: string;
};

export function Fence({ children, language }: FenceProps) {
  return (
    <Highlight code={children.trim()} language={language} theme={themes.vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export const fence = {
  render: "Fence",
  attributes: { language: { type: String } }
};