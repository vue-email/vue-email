import type { Plugin } from 'vue'

import { deepmerge } from '../utils'
import type { VueEmailPluginOptions } from '../types'
import * as components from '../components'
import { config } from '../config'

export const VueEmailPlugin: Plugin = {
  install(app, options: VueEmailPluginOptions = {}) {
    if (options) {
      console.log('config: ', config)
      console.log('options: ', options)
      console.log('app.config.globalProperties.$vueEmail: ', app.config.globalProperties.$vueEmail)
      deepmerge<VueEmailPluginOptions>(config, options)
      app.config.globalProperties.$vueEmail = options
      console.log('config: ', config)
      console.log('options: ', options)
      console.log('app.config.globalProperties.$vueEmail: ', app.config.globalProperties.$vueEmail)
    }

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default VueEmailPlugin
