import { marked, RendererObject } from "marked";
import { StylesType } from "./types";
import { initRenderer } from "./utils";

export class MarkdownParser {
  private readonly renderer: RendererObject;

  constructor({ customStyles }: { customStyles?: StylesType }) {
    this.renderer = initRenderer({ customStyles });
  }

  parse(markdown: string) {
    marked.use({
      renderer: this.renderer,
    });

    return marked.parse(markdown);
  }
}
