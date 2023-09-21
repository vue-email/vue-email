import { defineBuildConfig } from 'unbuild'
import { resolve } from 'node:path'

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  alias: {
    'vue-email': resolve(__dirname, 'core')
  },
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', 'vue-email', 'kolorist', 'vue-i18n', '@intlify/shared', '@intlify/core-base', '@vue/devtools-api', '@intlify/message-compiler'],
})
