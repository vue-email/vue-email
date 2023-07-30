import { createInitConfig } from './config'
import { compileTemplate, templateRender } from './template'
import { getFilesRecursively } from '$src/utils'

import type { DefineConfig, Options, RenderOptions } from '$src/types'

export const defineConfig: DefineConfig = (config: Options) => {
  const defaultConfig = createInitConfig(config)
  const dir = config?.dir ?? defaultConfig?.dir
  const files = getFilesRecursively(dir)

  for (const path of files) {
    compileTemplate(path, defaultConfig)
  }

  return {
    render: (name: string, options?: RenderOptions): Promise<string> => templateRender(name, options, defaultConfig),
  }
}
