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

// const PATH = '/__vue_email__'
// const PATH_ENTRY = `${PATH}/entry`
// const PATH_PLAYGROUND = `${PATH}/client`

export default defineNuxtModule({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // TODO: add devtools support
    // const playgroundDir = resolve('../dist/client')

    // nuxt.hook('vite:serverCreated', async (server) => {
    // 	if (await pathExists(playgroundDir)) server.middlewares.use(PATH_PLAYGROUND, sirv(playgroundDir, { single: true, dev: true }))
    // })

    // Add entry to nitro config
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

    // // add API handler
    // addServerHandler({
    // 	handler: resolve('./runtime/server/api/markup/[file].get.ts'),
    // 	route: '/api/markup/:file',
    // 	method: 'get',
    // 	lazy: true,
    // })

    // // Adds the emails directory as a global components directory
    // addComponentsDir({
    // 	path: '~/emails',
    // 	extensions: ['vue'],
    // 	global: true,
    // 	prefix: 'Emails',
    // 	preload: true,
    // 	prefetch: true,
    // 	watch: true,
    // })
    // nuxt.hook('devtools:customTabs', (iframeTabs) => {
    // 	iframeTabs.push({
    // 		name: 'vueemail',
    // 		title: 'Vue Email',
    // 		icon: 'twemoji:incoming-envelope',
    // 		view: {
    // 			type: 'iframe',
    // 			src: PATH_PLAYGROUND,
    // 		},
    // 	})
    // })

    nuxt.options.runtimeConfig.public.vueEmailOptions = options

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
