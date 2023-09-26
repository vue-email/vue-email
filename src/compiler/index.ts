import { join, resolve } from 'node:path'
import { readFileSync, readdirSync, statSync } from 'fs-extra'
import type { DefineConfig, Options, RenderOptions } from '../types/compiler'
import { createInitConfig } from './config'
import { templateRender } from './template'

export { templateRender } from './template'

export const config: DefineConfig = (dir: string, config: Options = {}) => {
  const defaultConfig = createInitConfig(config)
  const components = getAllComponents(dir)

  return {
    render: (name: string, options?: RenderOptions): Promise<string> => {
      const path = dir ? resolve(dir, name) : name
      const source = readFile(path)

      return templateRender(name, { source, components }, options, defaultConfig)
    },
  }
}

function readFile(path: string): string {
  return readFileSync(path, 'utf-8').toString()
}

function getAllComponents(emailsPath: string, basePath = ''): { name: string; source: string }[] {
  const result: { name: string; source: string }[] = []

  const files = readdirSync(emailsPath)

  files.forEach((file) => {
    const filePath = join(emailsPath, file)
    const relativePath = join(basePath, file)

    if (statSync(filePath).isDirectory()) {
      // If it's a directory, recursively call the function
      result.push(...getAllComponents(filePath, relativePath))
    } else {
      // If it's a file, add it to the result array
      result.push({
        name: relativePath.replace(/\\/g, ':'),
        source: readFile(filePath),
      })
    }
  })

  return result
}
