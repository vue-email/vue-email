import pretty from 'pretty'
import { renderToString } from 'vue/server-renderer'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp, getCurrentInstance } from 'vue'
import { cleanup, htmlToText } from '../utils'

export interface Options {
  pretty?: boolean
}

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

export async function useRender<T extends Component>(
  component: T,
  props?: ExtractComponentProps<T>,
  options: Options = {
    pretty: false,
  },
) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const App = createSSRApp(component, props || {})

  const markup = await renderToString(App)
  const text = htmlToText(markup)

  const doc = `${doctype}${cleanup(markup)}`

  return {
    html: options.pretty ? pretty(doc) : doc,
    text,
  }
}
