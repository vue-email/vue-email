import { renderToString } from 'vue/server-renderer'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp } from 'vue'
import type { Options } from "./options";
import { convert } from "html-to-text";
import { pretty } from "./utils/pretty";
import { plainTextSelectors } from "./plain-text-selectors";
import { cleanup } from './utils/cleanup';


export type ExtractComponentProps<TComponent> =
  TComponent extends new () => {
    $props: infer P
  }
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never

export interface VNode {
  type: string
  props: {
    style?: Record<string, any>
    children?: string | VNode | VNode[]
    [prop: string]: any
  }
}

export async function render<T extends Component>(
  component: T,
  props?: ExtractComponentProps<T>,
  options?: Options
) {

  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const App = createSSRApp(component, props || {})

  const markup = await renderToString(App)
  if (options?.plainText) {
    return convert(markup, {
      selectors: plainTextSelectors,
      ...(options?.plainText === true ? options.htmlToTextOptions : {}),
    })
  }

  const doc = `${doctype}${cleanup(markup)}`

  if (options && options.pretty) {
    return pretty(doc);
  }


  return doc
}
