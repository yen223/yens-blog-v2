import { Highlight, themes } from "prism-react-renderer"
import { Prism } from 'prism-react-renderer'
import bashLang from 'refractor/lang/bash';

type FenceProps = {
  children: string;
  language?: string;
};

export function Fence({ children, language }: FenceProps) {
  bashLang(Prism)
  return (
    <Highlight
      prism={Prism}
      code={children.trim()}
      language={language || ""}
      theme={themes.vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const updatedStyle = { ...style, backgroundColor: "var(--tw-prose-pre-bg)" };
        return (
          (
            <pre style={updatedStyle} >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )
        )
      }}
    </Highlight>
  );
}

export const fence = {
  render: "Fence",
  attributes: { language: { type: String } }
};