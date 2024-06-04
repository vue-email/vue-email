import {
  addComponent,
  addImportsSources,
  createResolver,
  defineNuxtModule,
  hasNuxtModule,
} from '@nuxt/kit'
import vue from '@vitejs/plugin-vue'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
  },
  setup(options, nuxt) {
    nuxt.hook('nitro:config', async (config) => {
      config.rollupConfig = config.rollupConfig || {}
      config.rollupConfig.plugins = config.rollupConfig.plugins || []

      config.rollupConfig.plugins.push(vue())
    })

    nuxt.options.runtimeConfig.public.vueEmail = defu(
      nuxt.options.runtimeConfig.public.vueEmail,
      options,
    )

    if (options.autoImport) {
      [
        'EBody',
        'EButton',
        'ECodeBlock',
        'ECodeInline',
        'EColumn',
        'EContainer',
        'EFont',
        'EHead',
        'EStyle',
        'EHeading',
        'EHr',
        'EHtml',
        'EImg',
        'ELink',
        'EPreview',
        'ERow',
        'ESection',
        'EText',
        'ETailwind',
        'EMarkdown',
      ].forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: 'vue-email',
        })
      })

      addImportsSources({
        from: 'vue-email',
        imports: ['useRender'],
      })
    }
  },
})
