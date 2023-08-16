import type { VueEmailPluginOptions } from 'vue-email'
import { templateRender } from 'vue-email/compiler'
import { useRuntimeConfig, useStorage } from '#imports'

export async function useCompiler(filename: string, props: Record<string, unknown> = {}) {
  const vueEmailOptions = useRuntimeConfig().public.vueEmailOptions as VueEmailPluginOptions

  const source = await useStorage('assets:emails').getItem(filename)

  const template = await templateRender(
    filename,
    source,
    {
      props,
    },
    {
      verbose: false,
      options: vueEmailOptions,
    },
  )

  return template
}
