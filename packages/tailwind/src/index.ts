import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { Parser } from 'htmlparser2'
import { findOne, findAll, appendChild } from 'domutils'
import { DomHandler } from "domhandler";
import render from 'dom-serializer'


import { renderToString } from 'vue/server-renderer'
import { minifyCss } from './utils/css/minify-css'
import type { TailwindConfig } from './utils'
import { useRgbNonSpacedSyntax } from './utils/compatibility/use-rgb-non-spaced-syntax'
import { getCssForMarkup } from './utils/tailwindcss/get-css-for-markup'
import { escapeClassName } from './utils/compatibility/escape-class-name'
import { getStylesPerClassMap } from './utils/css/get-css-class-properties-map'

export const Tailwind = defineComponent({
  name: 'Tailwind',
  props: {
    config: {
      type: Object as PropType<TailwindConfig>,
      default: {},
      required: false,
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default())
      throw new Error('Tailwind component must have a default slot')

    const $default = slots.default()
    let headStyles: string[] = []
    const markup = await renderToString(h('div', $default)).then(html => html.replace(/^<div[^>]*>|<\/div>$/g, ''))

    const markupCSS = useRgbNonSpacedSyntax(
      await getCssForMarkup(markup, props.config || {}),
    )

    const nonMediaQueryCSS = markupCSS.replaceAll(
      /@media\s*\(.*\)\s*{\s*\.(.*)\s*{[\s\S]*}\s*}/gm,
      (mediaQuery: any, _className: any) => {
        headStyles.push(
          mediaQuery
            .replace(/[\r\n|\r|\n]+/g, '')
            .replace(/\s+/g, ' ')
            .replaceAll(/\s*\.[\S]+\s*{([^}]*)}/gm, (match: string, content: string) => {
              return match.replace(
                content,
                content
                  .split(';')
                  .map(propertyDeclaration =>
                    propertyDeclaration.endsWith('!important')
                      ? propertyDeclaration.trim()
                      : `${propertyDeclaration.trim()}!important`,
                  )
                  .join(';'),
              )
            }),
        )

        return ''
      },
    )
    const nonMediaQueryTailwindStylesPerClass = getStylesPerClassMap(nonMediaQueryCSS)
    headStyles = headStyles.filter(style => style.trim().length > 0)
    const hasHTML = /<html[^>]*>/gm.test(markup)
    const hasHead = /<head[^>]*>/gm.test(markup)

    if (headStyles.length > 0 && (!hasHTML || !hasHead))
      throw new Error('Tailwind: To use responsive styles you must have a <Html> and <Head> element in your template.')

    const handler = new DomHandler();
    const parser = new Parser(handler);
    parser.write(markup);
    parser.end();

    const dom = handler.dom;

    const head = findOne(elem => elem.name === 'head', dom)

    if (headStyles.length > 0 && hasHead && head) {
      appendChild(head, {
        type: 'tag',
        name: 'style',
        children: [
          {
            type: 'text',
            data: minifyCss(headStyles.join('')),
          },
        ],
      } as any)
    }

    const hasAttrs = (elem: any) => elem.attribs && elem.attribs.class

    findAll(elem => hasAttrs(elem), dom)
      .forEach((elem) => {
        const currentStyles = elem.attribs.style || ''

        if (elem.attribs.class) {
          const fullClassName = elem.attribs.class as string
          const classNames = fullClassName.split(' ')
          const classNamesToKeep = [] as string[]

          const styles = [] as string[]
          classNames.forEach((className) => {
            const escapedClassName = escapeClassName(className)

            if (typeof nonMediaQueryTailwindStylesPerClass[escapedClassName] === 'undefined') {
              classNamesToKeep.push(className)
            }
            else {
              styles.push(
                `${nonMediaQueryTailwindStylesPerClass[escapedClassName]};`,
              )
            }
          })

          if (classNamesToKeep.length > 0)
            elem.attribs.class = classNamesToKeep.join(' ').trim()

          if (styles.length > 0)
            elem.attribs.style = `${currentStyles} ${styles.join(' ')}`.trim()

          if (elem.attribs.style === '')
            delete elem.attribs.style
        }
      })

    const html = render(dom, {
      decodeEntities: false,
      xmlMode: true,
    })

    return () => {
      return h('tailwind-clean-component', { innerHTML: html })
    }
  },
})
