import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';



type FenceProps = {
  children: string;
  language: string;
};

export function Fence({ children, language }: FenceProps) {
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {children}
    </SyntaxHighlighter>
  );
}

export const fence = {
  render: "Fence",
  attributes: { language: { type: String } }
};