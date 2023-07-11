import type { App } from 'vue'
import * as components from './components'

export type VueEmailOptions = {
  prefix?: string;
}

const Components = Object.keys(components).map(
  (key) => components[key as keyof object],
)

const defaultOptions: VueEmailOptions = {
  prefix: 'E',
}

const create = (createOptions: VueEmailOptions = {}) => {
  const install = (app: App, installOptions: VueEmailOptions = {}) => {
    const options = {
      ...defaultOptions,
      ...createOptions,
      ...installOptions,
    }

    if (Components)
      Components.forEach((component: any) => {
        // TODO: remove me
        const name = component.name.startsWith('E') ? component.name.slice(1) : component.name

        app.component(`${options.prefix}${name}`, component)
      })
  }

  return {
    install,
  }
}

export default create
