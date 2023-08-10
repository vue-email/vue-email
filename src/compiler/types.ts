// Extend the descriptor so we can store the scopedId on it
declare module 'vue/compiler-sfc' {
  interface SFCDescriptor {
    id: string
  }
}

export interface DefineConfigFunctions {
  render: (name: string, options?: RenderOptions) => Promise<string>
}

export type DefineConfig = (config: Options) => DefineConfigFunctions

export interface Options {
  dir: string
  /**
   * Show library logger
   * @default true
   */
  verbose?: boolean
}

export interface RenderOptions {
  props?: Record<string, unknown>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
