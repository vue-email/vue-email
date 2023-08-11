import { useRuntimeConfig, useStorage } from '#imports'
import { templateRender } from 'vue-email/compiler'

export async function useCompiler(filename, props) {
  const vueEmailOptions = useRuntimeConfig().public.vueEmailOptions

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
