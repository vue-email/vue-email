import type { Plugin } from 'vue'

import { deepmerge } from '../utils'
import type { VueEmailPluginOptions } from '../types'
import * as components from '../components'
import { config } from '../config'

export const VueEmailPlugin: Plugin = {
  install(app, options: VueEmailPluginOptions = {}) {
    if (options)
      deepmerge<VueEmailPluginOptions>(config, options)

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default VueEmailPlugin
