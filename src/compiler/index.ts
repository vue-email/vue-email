import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { DefineConfig, Options, RenderOptions } from '../types/compiler'
import { createInitConfig } from './config'
import { templateRender } from './template'

export { templateRender } from './template'

export const config: DefineConfig = (dir: string, config: Options = {}) => {
  const defaultConfig = createInitConfig(config)

  return {
    render: (name: string, options?: RenderOptions): Promise<string> => {
      const path = dir ? resolve(dir, name) : name
      const source = readFile(path)

      return templateRender(name, source, options, defaultConfig)
    },
  }
}

/**
 * Returns the content of a file at path.
 *
 * @param path
 */
function readFile(path: string): string {
  return readFileSync(path, 'utf-8').toString()
}
