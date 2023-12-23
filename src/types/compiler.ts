import type { TailwindConfig } from '@vue-email/tailwind'

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
  i18n?: I18n
  /**
   *
   * @default null
   * @example
   * ```ts
   * tailwindConfig: './tailwind.config.js'
   * ```
   *
   * @see https://vue-email.net/getting-started/installation#options
   *
   */
  tailwindConfig?: TailwindConfig
}

export interface I18n {
  locale?: string
  defaultLocale: string
  translations?: Record<string, Record<string, string>>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
