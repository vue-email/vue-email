import { extname, join, resolve } from 'node:path'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import type { DefineConfig, Options, RenderOptions, RenderedEmail } from '../types/compiler'
import { createInitConfig } from './config'
import { templateRender } from './template'

export { templateRender } from './template'

export const config: DefineConfig = (dir: string, config: Options = {}) => {
  const defaultConfig = createInitConfig(config)
  const components = getAllVueComponents(dir)

  return {
    render: (name: string, options?: RenderOptions): Promise<RenderedEmail> => {
      const path = dir ? resolve(dir, name) : name
      const source = readFile(path)

      return templateRender(name, { source, components }, options, defaultConfig)
    },
  }
}

function readFile(path: string): string {
  return readFileSync(path, 'utf-8').toString()
}

function getAllVueComponents(emailsPath: string, basePath = ''): { name: string; source: string }[] {
  const result: { name: string; source: string }[] = []

  const files = readdirSync(emailsPath)

  files.forEach((file) => {
    const filePath = join(emailsPath, file)
    const relativePath = join(basePath, file)

    if (statSync(filePath).isDirectory()) {
      // If it's a directory, recursively call the function
      result.push(...getAllVueComponents(filePath, relativePath))
    } else if (extname(file) === '.vue') {
      // If it's a .vue file, add it to the result array
      result.push({
        name: relativePath.replace(/\\/g, ':'),
        source: readFileSync(filePath, 'utf8'), // Read the file content as a string
      })
    }
  })

  return result
}
