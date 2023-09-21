import type { Plugin } from 'vue'

import * as components from '../components'
import type { VueEmailPluginOptions } from '../types'
import { config } from '../config'
import { deepmerge } from '../utils/assign-deep'

export const VueEmailPlugin: Plugin = {
  install(app, options: VueEmailPluginOptions = {}) {
    if (options) deepmerge<VueEmailPluginOptions>(config, options)

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default VueEmailPlugin
