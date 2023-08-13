import { defineComponent, h } from 'vue'
import { type TailwindConfig } from 'tw-to-css'
import { renderToString } from 'vue/server-renderer'
import { cleanCss, getMediaQueryCss, makeCssMap } from '../utils/css'

export default defineComponent({
  name: 'ETailwind',
  props: {
    config: {
      type: Object as () => TailwindConfig,
      default: undefined,
      required: false,
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default()) {
      throw new Error('ETailwind component must have a default slot')
    }

    const $default = slots.default()
    const { tailwindToCSS } = await import('tw-to-css')
    const { parse } = (await import('node-html-parser')).default
    const { twi } = tailwindToCSS({ config: props.config })
    const fullHTML = await renderToString(h('div', $default)).then((html) => html.replace(/^<div[^>]*>|<\/div>$/g, ''))

    const tailwindCss = twi(fullHTML, {
      merge: false,
      ignoreMediaQueries: false,
    })
    const css = cleanCss(tailwindCss)
    const cssMap = makeCssMap(css)
    const headStyle = getMediaQueryCss(css)
    const hasResponsiveStyles = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm.test(headStyle)

    const hasHTML = /<html[^>]*>/gm.test(fullHTML)
    const hasHead = /<head[^>]*>/gm.test(fullHTML)

    if (hasResponsiveStyles && (!hasHTML || !hasHead)) {
      throw new Error('Tailwind: To use responsive styles you must have a <html> and <head> element in your template.')
    }

    const parsedHTML = parse(fullHTML)

    parsedHTML.querySelectorAll('*').forEach((domNode) => {
      if (domNode.nodeType === 1) {
        if (hasResponsiveStyles && hasHead && domNode.tagName === 'HEAD') {
          domNode.appendChild(parse(`<style>${headStyle}</style>`))
        }

        if (domNode.attributes.class) {
          const cleanRegex = /[:#\!\-[\]\/\.%]+/g
          const cleanTailwindClasses = domNode.attributes.class.replace(cleanRegex, '_')

          const currentStyles = domNode.attributes.style || ''

          const tailwindStyles = cleanTailwindClasses
            .split(' ')
            .map((className) => {
              return cssMap[`.${className}`]
            })
            .filter((style) => style)
            .join(';')

          domNode.setAttribute('style', `${currentStyles} ${tailwindStyles}`)

          domNode.setAttribute(
            'class',
            domNode.attributes.class
              .split(' ')
              .filter((className) => className.search(/^.{2}:/) !== -1)
              .join(' ')
              .replace(cleanRegex, '_'),
          )

          if (!domNode.attributes.class) domNode.removeAttribute('class')
        }
      }
    })

    const html = parsedHTML.toString()

    return () => {
      return h('template', { innerHTML: html })
    }
  },
  render() {
    return h('render')
  },
})
