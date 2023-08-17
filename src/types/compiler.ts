import type { Component } from 'vue'
import type { VueEmailPLuginOptions } from './index'


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

export interface RenderOptions {
  props?: Record<string, unknown>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>

export type ImportFromStringFn = (source: string) => Promise<Component>

export type TemplateRenderFn = (name: string, source: string, options?: RenderOptions, config?: Options) => Promise<string>
