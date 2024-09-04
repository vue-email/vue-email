import type { HtmlToTextOptions } from "html-to-text";
import { Component, DefineComponent } from 'vue'

export type Options = {
  pretty?: boolean;
} & (
    | {
      plainText?: false;
    }
    | {
      plainText?: true;
      /**
       * These are options you can pass down directly to the library we use for
       * converting the rendered email's HTML into plain text.
       *
       * @see https://github.com/html-to-text/node-html-to-text
       */
      htmlToTextOptions?: HtmlToTextOptions;
      components?:  { [name: string]: Component | DefineComponent }
    }
  );
