import type { VueEmailPluginOptions } from 'vue-email'
import { templateRender } from 'vue-email/compiler'
import { useRuntimeConfig, useStorage } from '#imports'

/**
 * Compile a email template
 * @param {string} filename
 * @param {object} options
 * @returns {string}
 *
 * @example
 * ```ts
 * useCompiler('template.vue', {
 *  props: {
 *    name: 'foo',
 *  },
 *  locale: 'en',
 *  translations: {},
 * })
 * ```
 */
export async function useCompiler(filename: string, { props = {}, i18n = {} }) {
  const vueEmailOptions = useRuntimeConfig().public.vueEmailOptions as VueEmailPluginOptions
  const source = await useStorage('assets:emails').getItem(filename)

  const template = await templateRender(
    filename,
    source,
    {
      props,
      ...i18n,
    },
    {
      verbose: false,
      options: vueEmailOptions,
    },
  )

  return template
}
