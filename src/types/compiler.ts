import type { VueEmailPluginOptions } from './index'

export interface DefineConfigFunctions {
  render: (name: string, options?: RenderOptions) => Promise<string>
}

export type DefineConfig = (dir: string, config?: Options) => DefineConfigFunctions

export interface Options {
  /**
   * Show library logger
   * @default true
   */
  verbose?: boolean
  /**
   * Provide translations for your templates.
   * @see
   */
  i18n?: {
    /**
     * The default locale if none is provided.
     * It is also used as fallback if translation does not exist in requested locale.
     */
    defaultLocale: string
    /**
     * @see https://vue-i18n.intlify.dev/
     * @example
     * ```ts
     * translations: {
     *   en: {
     *     hello: "Hello"
     *   },
     *   sv: {
     *     hello: "Hej"
     *   }
     * }
     * ```
     */
    translations?: Record<string, Record<string, string>>
  }
  /**
   * VueEmailPlugin options
   * @default {}
   * @see
   * https://vuemail.net/getting-started/installation#options
   */
  options?: VueEmailPluginOptions
}

export interface RenderOptions {
  locale?: string
  translations?: Record<string, Record<string, string>>
  props?: Record<string, unknown>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
