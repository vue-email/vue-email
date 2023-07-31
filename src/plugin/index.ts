import type { Plugin } from 'vue'

import * as components from '../components'
import type { VueEmailPLuginOptions } from '../types'
import { config } from '../config'
import { assign } from '../utils/assign-deep'

export const VueEmailPlugin: Plugin = {
  install(app, options: VueEmailPLuginOptions = {}) {
    if (options) assign(config, options)

    // Register components
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default VueEmailPlugin
