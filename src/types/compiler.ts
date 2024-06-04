import type { TailwindConfig } from '@vue-email/tailwind'

export interface VueEmailPluginOptions {
  baseUrl?: string | null
  tailwind?: TailwindConfig
}

export interface I18n {
  locale?: string
  defaultLocale: string
  translations?: Record<string, Record<string, string>>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>

declare module 'vue' {
  interface ComponentCustomProperties {
    $vueEmail: VueEmailPluginOptions
  }
}
