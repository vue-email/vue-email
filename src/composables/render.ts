import { type Component, createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { convert } from 'html-to-text'
import pretty from 'pretty'

export interface Options {
  pretty?: boolean
  plainText?: boolean
  i18n?: {
    locale: string
    defaultLocale: string
    translations: Record<string, Record<string, string>>
  }
}

/**
 * Convert Vue file into HTML email template
 * @param component The main component to render
 * @param props The props passed to the component
 * @param {Options} options The options to convert the template
 * @returns {string}
 */
export async function useRender(
  component: Component,
  props?: any,
  options: Options = {
    pretty: false,
    plainText: false,
    i18n: undefined,
  },
) {
  let vueI18n

  try {
    if (options?.i18n) {
      vueI18n = await import('vue-i18n')
    }
  } catch (error) {
    throw new Error('For i18n usage you must install the package, using npm i vue-i18n@latest')
  }

  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const app = createApp({ render: () => h(component) }, props)

  if (options?.i18n?.defaultLocale && vueI18n) {
    const i18n = vueI18n.createI18n({
      locale: options?.i18n?.locale,
      fallbackLocale: options?.i18n.defaultLocale,
      messages: options?.i18n.translations,
    })

    app.use(i18n)
  }

  const markup = await renderToString(app)

  if (options.plainText) {
    return convert(markup, {
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: '#__vue-email-preview', format: 'skip' },
      ],
    })
  }

  const doc = `${doctype}${replaceString(markup)}`

  if (options.pretty) {
    return pretty(doc)
  }

  return doc
}

function replaceString(str: string) {
  if (!str || typeof str !== 'string') return str

  return str
    .replace(/ data-v-inspector="[^"]*"/g, '')
    .replace(/<!--\[-->/g, '')
    .replace(/<!--]-->/g, '')
    .replace(/<!---->/g, '')
    .replace(/<template>/g, '')
    .replace(/<\/template>/g, '')
}
