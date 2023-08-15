import { defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { load } from 'cheerio'
import { tailwindToCSS } from '@flowko/tw-to-css'
import type { TailwindConfig } from '@flowko/tw-to-css'
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

    const $ = load(fullHTML, { decodeEntities: false, xmlMode: true })

    $('*').each((index, domNode) => {
      if (domNode.type === 'tag') {
        if (hasResponsiveStyles && hasHead && domNode.name === 'head') {
          $(domNode).append(`<style>${headStyle}</style>`)
        }

        const $domNode = $(domNode)
        const classAttr = $domNode.attr('class')

        if (classAttr) {
          const cleanRegex = /[:#\!\-[\]\/\.%]+/g
          const cleanTailwindClasses = classAttr.replace(cleanRegex, '_')

          const currentStyles = $domNode.attr('style') || ''

          const tailwindStyles = cleanTailwindClasses
            .split(' ')
            .map((className) => {
              return cssMap[`.${className}`]
            })
            .filter((style) => style)
            .join(';')

          $domNode.attr('style', `${currentStyles} ${tailwindStyles}`)

          const newClassAttr = classAttr
            .split(' ')
            .filter((className) => className.search(/^.{2}:/) !== -1)
            .join(' ')
            .replace(cleanRegex, '_')

          if (newClassAttr) {
            $domNode.attr('class', newClassAttr)
          } else {
            $domNode.removeAttr('class')
          }
        }
      }
    })

    const html = $.html()

    return () => {
      return h('template', { innerHTML: html })
    }
  },
  render() {
    return h('render')
  },
})
