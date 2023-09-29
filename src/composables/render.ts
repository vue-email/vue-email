import { type Component, createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { convert } from 'html-to-text'
import pretty from 'pretty'
import { cleanup } from '../utils'

export interface Options {
  pretty?: boolean
  text?: boolean
}

export interface I18n {
  locale: string
  defaultLocale: string
  translations: Record<string, Record<string, string>>
}

export interface RenderParams {
  props?: any
  i18n?: I18n
}

/**
 * Convert Vue file into HTML email template
 * @param component The main component to render
 * @param props The props passed to the component
 * @param {Options} options The options to convert the template
 * @returns {string}
 * @example
 *
 * await useRender('component.vue', {
 *  props: {
 *    name: 'John',
 *  }
 *  i18n: {
 *    locale: 'en'
 *    translations: {}
 *  }
 * })
 */
export async function useRender(
  component: Component,
  params?: RenderParams | null,
  options: Options = {
    pretty: false,
    text: false,
  },
) {
  let vueI18n

  try {
    if (params?.i18n) {
      vueI18n = await import('vue-i18n')
    }
  } catch (error) {
    throw new Error('For i18n usage you must install the package, using npm i vue-i18n@latest')
  }

  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const app = createApp({ render: () => h(component) }, params?.props)

  if (params?.i18n?.defaultLocale && vueI18n) {
    const i18n = vueI18n.createI18n({
      locale: params?.i18n?.locale,
      fallbackLocale: params?.i18n?.defaultLocale,
      messages: params?.i18n?.translations,
    })

    app.use(i18n)
  }

  const markup = await renderToString(app)

  if (options.text) {
    return convert(markup, {
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: '#__vue-email-preview', format: 'skip' },
      ],
    })
  }

  const doc = `${doctype}${cleanup(markup)}`

  if (options.pretty) {
    return pretty(doc)
  }

  return doc
}
