export interface VueEmailPluginOptions {
  /**
   * The base URL of your website.
   * @default null
   * @example
   * ```ts
   * baseUrl: 'https://example.com'
   * ```
   * @see https://vue-email.net/getting-started/installation#options
   */
  baseUrl?: string | null
  /**
   * Provide translations for your templates.
   * @see
   */
  i18n?: i18n
  [key: string]: any
}

export interface i18n {
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
   * VueEmailPlugin options
   * @default {}
   * @see
   * https://vuemail.net/getting-started/installation#options
   */
  options?: VueEmailPluginOptions
}

export interface SourceOptions {
  /**
   * The source code of the component.
   */
  source: string
  /**
   * The components used in the component.
   */
  components: {
    name: string
    source: string
  }[]
}

export interface RenderOptions {
  props?: Record<string, unknown>
  i18n?: i18n
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
