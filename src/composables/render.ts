import { type Component, createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

export interface Options {
  pretty?: boolean
  plainText?: boolean
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
  },
) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const app = createApp({ render: () => h(component) }, props)
  const markup = await renderToString(app)

  if (options.plainText) {
    const { convert } = await import('html-to-text')

    return convert(markup, {
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: '#__vue-email-preview', format: 'skip' },
      ],
    })
  }

  const doc = `${doctype}${replaceString(markup)}`

  if (options.pretty) {
    const pretty = (await import('pretty')).default
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
