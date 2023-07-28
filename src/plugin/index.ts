import type { Plugin } from 'vue'
import * as components from '../components'

export const VueEmailPlugin: Plugin = {
  install(app) {
    // Register components
    const Components = Object.keys(components).map((key) => components[key as keyof object])

    // Register core components
    Components.forEach((component: any) => {
      app.component(component.name, component)
    })
  },
}

export default VueEmailPlugin
