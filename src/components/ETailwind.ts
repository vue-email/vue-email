import { defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import * as htmlparser2 from 'htmlparser2'
import * as domutils from 'domutils'
import render from 'dom-serializer'
import { cleanCss, getMediaQueryCss, makeCssMap } from '../utils'

export default defineComponent({
  name: 'ETailwind',
  props: {
    config: {
      type: Object as () => import('@flowko/tw-to-css').TailwindConfig,
      default: undefined,
      required: false,
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default())
      throw new Error('ETailwind component must have a default slot')

    const $default = slots.default()
    const { tailwindToCSS } = await import('@flowko/tw-to-css')
    const { twi } = tailwindToCSS({ config: props.config })
    const fullHTML = await renderToString(h('div', $default)).then(html => html.replace(/^<div[^>]*>|<\/div>$/g, ''))

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

    if (hasResponsiveStyles && (!hasHTML || !hasHead))
      throw new Error('Tailwind: To use responsive styles you must have a <html> and <head> element in your template.')

    const dom = htmlparser2.parseDocument(fullHTML)

    const head = domutils.findOne(elem => elem.name === 'head', dom.children)

    if (hasResponsiveStyles && hasHead && head) {
      domutils.appendChild(head, {
        type: 'tag',
        name: 'style',
        children: [
          {
            type: 'text',
            data: headStyle,
          },
        ],
      } as any)
    }

    const hasAttrs = (elem: any) => elem.attribs && elem.attribs.class

    domutils
      .findAll(elem => hasAttrs(elem), dom.children)
      .forEach((elem) => {
        const classAttr = elem.attribs.class
        const cleanRegex = /[:#\!\-[\]\/\.%]+/g
        const cleanTailwindClasses = classAttr.replace(cleanRegex, '_')

        const currentStyles = elem.attribs.style || ''

        const tailwindStyles = cleanTailwindClasses
          .split(' ')
          .map((className) => {
            return cssMap[`.${className}`]
          })
          .filter(style => style)
          .join(';')

        elem.attribs.style = `${currentStyles} ${tailwindStyles}`
        const newClassAttr = classAttr
          .split(' ')
          .filter(className => className.search(/^.{2}:/) !== -1)
          .join(' ')
          .replace(cleanRegex, '_')

        if (newClassAttr)
          elem.attribs.class = newClassAttr

        else
          delete elem.attribs.class
      })

    const html = render(dom, {
      decodeEntities: false,
      xmlMode: true,
    })

    return () => {
      return h('tailwind-clean', { innerHTML: html })
    }
  },
})
