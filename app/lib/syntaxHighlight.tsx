import Prism from "prismjs";

// Load the grammars you want to support
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";

type FenceProps = {
  children: string;
  language: string;
};

export function Fence({ children, language }: FenceProps) {
  let grammar = Prism.languages[language];
  if (!grammar) {
    return <pre className={`language-${language}`}>{children}</pre>;
  }
  let content = Prism.highlight(children, Prism.languages[language], language);

  return (
    <pre
      className={`language-${language}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export const fence = {
  render: "Fence",
  attributes: { language: { type: String } }
};