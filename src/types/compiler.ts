// Extend the descriptor so we can store the scopedId on it
declare module 'vue/compiler-sfc' {
  interface SFCDescriptor {
    id: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development'
  }
}

export interface DefineConfigFunctions {
  render: (name: string, options?: RenderOptions) => Promise<string>
}

export type DefineConfig = (config: Options) => DefineConfigFunctions

export interface Options {
  dir: string
  verbose?: boolean
  input?: {
    templates?: {
      /**
       * Templates directory
       * @default {dir}/templates
       */
      dir?: string
    }
  }
  output?: {
    /**
     * Output directory
     * @default {dir}/.vuemail
     */
    dir?: string
    /**
     * Instantly generate all templates found in the templates directory.
     * If this is set to false, generate your templates with:
     *   - vuemail.compile(directory: string) - Generates all templates in directory.
     *     or
     *   - vuemail.compileTemplate(filename: string) - Generates a single template.
     * @default true
     */
    auto?: boolean
  }
}

export interface RenderOptions {
  props?: Record<string, unknown>
}

export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
