import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { addComponent, addComponentsDir, addImportsSources, addPlugin, addServerHandler, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'
import sirv from 'sirv'
import type { VueEmailPluginOptions } from '@vue-email/types'

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
const PATH = '/__vue_email__'
const PATH_PLAYGROUND = `${PATH}/client`

export type ModuleOptions = VueEmailPluginOptions

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
  },
  defaults(nuxt) {
    const isDev = process.env.NODE_ENV === 'development' || nuxt.options.dev

    return {
      baseUrl: null,
      playground: isDev,
    }
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const playgroundDir = resolve('../../../client/dist')

    nuxt.options.runtimeConfig.public.vueEmailOptions = options || {}

    if (!nuxt.options.build.transpile) nuxt.options.build.transpile = []
    const transpileList = ['defu', 'vue-email']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName)) nuxt.options.build.transpile.push(pkgName)
    })

    // Setup playground. Only available in development

    if (options.playground) {
      addServerHandler({
        handler: resolve('./runtime/server/api/emails.get'),
        route: '/api/emails',
        method: 'get',
        lazy: true,
      })
      addServerHandler({
        handler: resolve('./runtime/server/api/render/[file].get'),
        route: '/api/render/:file',
        method: 'get',
        lazy: true,
      })

      nuxt.hook('vite:serverCreated', async (server) => {
        server.middlewares.use(PATH_PLAYGROUND, sirv(playgroundDir, { single: true, dev: true }))
      })

      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore runtime type
      nuxt.hook('devtools:customTabs', (iframeTabs) => {
        iframeTabs.push({
          name: 'vueemail',
          title: 'Vue Email',
          icon: 'twemoji:incoming-envelope',
          view: {
            type: 'iframe',
            src: PATH_PLAYGROUND,
          },
        })
      })
    }

    addTemplate({
      filename: 'types/vue-email.d.ts',
      getContents: () => ["declare module '#vue-email' {", `  const useCompiler: typeof import('${resolve('./runtime/server/services')}').useCompiler`, '}'].join('\n'),
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({
        path: resolve(nuxt.options.buildDir, 'types/vue-email.d.ts'),
      })
    })

    addPlugin(resolve('./runtime/templates/vue-email'))

    components.forEach((component) => {
      addComponent({
        name: component,
        export: component,
        filePath: 'vue-email',
      })
    })

    // --- Templates ---

    let templatesDir = '/emails'

    // Loop through nuxt layers and check where the email component folder is.
    for (const layer of nuxt.options._layers) {
      const templatesPath = join(layer.cwd, '/emails')
      const pathFound = existsSync(templatesPath)
      if (!pathFound) {
        continue
      }
      templatesDir = templatesPath
      break
    }

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')],
      })
      nitroConfig.alias['#vue-email'] = resolve('./runtime/server/services')

      nitroConfig.serverAssets = nitroConfig.serverAssets || []
      nitroConfig.serverAssets.push({
        baseName: 'emails',
        dir: templatesDir,
      })
    })

    await addComponentsDir({
      // TODO: add options to add a custom path and indicate if is absolute or relative
      // for example (absolute o relative):
      // path: options?.absolutePath ? resolve('emails') : templatesDir,
      //
      // custom:
      // path: options?.emailsDir || templatesDir,
      path: templatesDir,
      extensions: ['vue'],
      global: true,
    })

    addImportsSources({
      from: 'vue-email',
      imports: ['useRender'],
    })
  },
})

interface ModulePublicRuntimeConfig {}

interface ModulePrivateRuntimeConfig {}

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      vueEmailOptions: ModulePublicRuntimeConfig
    }
    privateRuntimeConfig?: {
      vueEmailOptions: ModulePrivateRuntimeConfig
    }
  }
}
