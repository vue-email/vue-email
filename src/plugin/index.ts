import type { Plugin } from 'vue'
import * as components from '../components'

export const VueEmailPlugin: Plugin = {
  install(app) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

export default VueEmailPlugin
