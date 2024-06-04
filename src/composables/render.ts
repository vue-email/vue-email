import pretty from 'pretty'
import { renderToString } from 'vue/server-renderer'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp } from 'vue'
import { cleanup, htmlToText } from '../utils'
// import type { I18n } from '../types'
import { config } from '../config'

export interface Options {
  pretty?: boolean
}

export interface RenderParams {
  props?: any
  // i18n?: I18n
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

// async function useI18n(app: App, params?: RenderParams | null) {
//   const hasI18n = params?.i18n?.defaultLocale || params?.i18n?.translations || params?.i18n?.locale

//   if (!hasI18n || !params)
//     return

//   let vueI18n

//   try {
//     if (params?.i18n)
//       vueI18n = await import('vue-i18n')
//   }
//   catch (error) {
//     throw new Error('For i18n usage you must install the package, using npm i vue-i18n@latest')
//   }

//   if (vueI18n) {
//     const i18n = vueI18n.createI18n({
//       locale: params?.i18n?.locale,
//       fallbackLocale: params?.i18n?.defaultLocale || 'en',
//       messages: params?.i18n?.translations,
//     })

//     app.use(i18n)
//   }
// }

/**
 * Convert Vue file into HTML email template
 * @param {Component} component The main component to render
 * @param {RenderParams} [params] The parameters for rendering the component
 * @param {Options} [options] The options to convert the template
 * @returns {Promise<string>} The HTML email template
 * @throws {Error} If vue-i18n package is not installed for i18n usage
 *
 * @example
 * await useRender('component.vue', {
 *   props: {
 *     name: 'John',
 *   },
//  *   i18n: {
//  *     locale: 'en',
//  *     translations: {},
//  *   },
 * });
 */
export async function useRender<T extends Component>(
  component: T,
  props?: ExtractComponentProps<T>,
  options: Options = {
    pretty: false,
  },
) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const App = createSSRApp(component, props || {})

  App.config.globalProperties.$vueEmail = config

  // await useI18n(app, params)

  const markup = await renderToString(App)
  const text = htmlToText(markup)

  const doc = `${doctype}${cleanup(markup)}`

  return {
    html: options.pretty ? pretty(doc) : doc,
    text,
  }
}
