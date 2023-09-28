import type { Plugin } from 'vue'

import * as components from '../components'
import { config } from '../config'
import { deepmerge } from '@vue-email/utils'
import type { VueEmailPluginOptions } from '@vue-email/types'

export const VueEmailPlugin: Plugin = {
  install(app, options: VueEmailPluginOptions = {}) {
    if (options) deepmerge<VueEmailPluginOptions>(config, options)

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default VueEmailPlugin
