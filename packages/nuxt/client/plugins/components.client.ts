import { Pane, Splitpanes } from 'splitpanes'

import 'splitpanes/dist/splitpanes.css'

export default defineNuxtPlugin((plugin) => {
  plugin.vueApp.component('Splitpanes', Splitpanes)
  plugin.vueApp.component('Pane', Pane)
})
