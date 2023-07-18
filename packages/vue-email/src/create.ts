import type { App } from 'vue'
import * as components from './components'
import { injectIconsKey } from './composables'

export type VueEmailOptions = {
  icon?: {
    size: string | false;
    aliases: {
      [alias: string]: string;
    };
    class: string;
  };
}

const defaultOptions: VueEmailOptions = {
  icon: {
    size: '1em',
    aliases: {},
    class: '',
  },
}

const Components = Object.keys(components).map(
  (key) => components[key as keyof object],
)

const create = (createOptions: VueEmailOptions = {}) => {
  const install = (app: App, installOptions: VueEmailOptions = {}) => {
    const options = {
      ...defaultOptions,
      ...createOptions,
      ...installOptions,
    }

    if (Components)
      Components.forEach((component: any) => {
        app.component(component.name, component)
      })

    app.provide(injectIconsKey, options.icon)
  }

  return {
    install,
  }
}

export default create
