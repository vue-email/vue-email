import type { TailwindConfig } from '@vue-email/tailwind'

export interface VueEmailPluginOptions {
  baseUrl?: string | null
  tailwind?: TailwindConfig
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
