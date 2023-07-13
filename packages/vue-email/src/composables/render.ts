import { convert } from 'html-to-text'
import pretty from 'pretty'
import { createApp, h, type Component, type App } from 'vue'
// import { renderToString } from 'vue/server-renderer'

export interface Options {
  pretty?: boolean;
  plainText?: boolean;
}

const renderToString = (app: App) => {
  const mounted = app.mount(document.createElement('div'))

  const markup = mounted.$el.outerHTML

  return markup
}

/**
 * Convert Vue file into HTML email template
 * @param component The main component to render
 * @param props The props passed to the component
 * @param {Options} options The options to convert the template
 * @returns {string}
 */
export const useRender = (
  component: Component,
  props?: any,
  options?: Options,
) => {
  if (options?.plainText) {
    return renderAsText(component)
  }

  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const app = createApp({ render: () => h(component) }, props)
  const markup = renderToString(app)
  const doc = `${doctype}${markup}`

  if (options?.pretty) {
    return pretty(doc)
  }

  return doc
}

const renderAsText = (component: Component) => {
  const app = createApp({ render: () => h(component) })
  const markup = renderToString(app)

  return convert(markup, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: '#__vue-email-preview', format: 'skip' },
    ],
  })
}
