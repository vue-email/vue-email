import type { VueEmailPLuginOptions } from './index'

export interface DefineConfigFunctions {
  render: (name: string, options?: RenderOptions) => Promise<string>
}

export type DefineConfig = (config: Options) => DefineConfigFunctions

export interface Options {
  dir?: string
  /**
   * Show library logger
   * @default true
   */
  verbose?: boolean
  /**
   * VueEmailPlugin options
   * @default {}
   * @see
   * https://vue-email.vercel.app/getting-started/installation#options
   */
  options?: VueEmailPLuginOptions
}

export interface RenderOptions {
  props?: Record<string, unknown>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
