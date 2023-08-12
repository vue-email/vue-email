import { addComponent, addImportsSources, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'

const components = [
  'EBody',
  'EButton',
  'EColumn',
  'EContainer',
  'EFont',
  'EHead',
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
]

export default defineNuxtModule({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.vueEmailOptions = options

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')],
      })
      nitroConfig.alias['#vue-email'] = resolve('./runtime/server/services')

      nitroConfig.serverAssets = nitroConfig.serverAssets || []
      nitroConfig.serverAssets.push({
        baseName: 'emails',
        dir: '../emails',
      })
    })

    addTemplate({
      filename: 'types/vue-email-server.d.ts',
      getContents: () => ["declare module '#vue-email' {", `  const useCompiler: typeof import('${resolve('./runtime/server/services')}').useCompiler`, '}'].join('\n'),
    })

    addPlugin(resolve('./index.plugin.mjs'))

    components.forEach((component) => {
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
  },
})
