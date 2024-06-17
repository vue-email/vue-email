import { MarkdownParser } from "./parser";
import { parseMarkdownToJSXProps } from "./types";

export const parseMarkdownToJSX = ({
  markdown,
  customStyles,
}: parseMarkdownToJSXProps) => {
  const parser = new MarkdownParser({ customStyles });
  return parser.parse(markdown);
};
