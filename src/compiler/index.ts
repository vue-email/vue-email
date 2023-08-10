import { createInitConfig } from './config'
import { templateRender } from './template'

import type { DefineConfig, Options, RenderOptions } from './types'

export const config: DefineConfig = (config: Options) => {
  const defaultConfig = createInitConfig(config)

  return {
    render: (name: string, options?: RenderOptions): Promise<string> => templateRender(name, options, defaultConfig),
  }
}
