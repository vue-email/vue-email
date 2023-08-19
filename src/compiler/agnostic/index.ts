/* eslint-disable unicorn/prefer-node-protocol */
import { resolve } from 'path'
import { readFileSync } from 'fs'
import type { DefineConfig, Options, RenderOptions, TemplateRenderFn } from '../../types/compiler'
import { createInitConfig } from './config'

export function createCompiler(templateRender: TemplateRenderFn): DefineConfig {
  return (dir: string, config: Options = {}) => {
    const defaultConfig = createInitConfig(config)

    return {
      render: (name: string, options?: RenderOptions): Promise<string> => {
        const path = dir ? resolve(dir, name) : name
        const source = readFile(path)

        return templateRender(name, source, options, defaultConfig)
      },
    }
  }
}

/**
 * Returns the content of a file at path.
 *
 * @param path
 */
export function readFile(path: string): string {
  return readFileSync(path, 'utf-8').toString()
}
