import type { App } from 'vue'
import * as components from './components'

const Components = Object.keys(components).map(
  (key) => components[key as keyof object],
)

const create = () => {
  const install = (app: App) => {
    if (Components)
      Components.forEach((component: any) => {
        app.component(component.name, component)
      })
  }

  return {
    install,
  }
}

export default create
