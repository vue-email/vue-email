import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import * as htmlparser2 from 'htmlparser2'
import * as domutils from 'domutils'
import render from 'dom-serializer'
import type { TailwindConfig } from '@vue-email/tailwind'
import { escapeClassName, getCssForMarkup, getStylesPerClassMap, minifyCss, useRgbNonSpacedSyntax } from '@vue-email/tailwind'
import { config } from '../config'

export default defineComponent({
  name: 'ETailwind',
  props: {
    config: {
      type: Object as PropType<TailwindConfig>,
      required: false,
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default())
      throw new Error('ETailwind component must have a default slot')

    const $default = slots.default()
    let headStyles: string[] = []
    const markupWithTailwindClasses = await renderToString(h('div', $default)).then(html => html.replace(/^<div[^>]*>|<\/div>$/g, ''))

    const tailwindConfig = props.config || config.tailwind

    const markupCSS = useRgbNonSpacedSyntax(
      await getCssForMarkup(markupWithTailwindClasses, tailwindConfig),
    )

    const nonMediaQueryCSS = markupCSS.replaceAll(
      /@media\s*\(.*\)\s*\{\s*\.(.*)\s*\{[\s\S]*\}\s*\}/g,
      (mediaQuery: any, _className: any) => {
        headStyles.push(
          mediaQuery
            .replace(/[\r\n|]+/g, '')
            .replace(/\s+/g, ' ')
            .replaceAll(/\s*\.\S+\s*\{([^}]*)\}/g, (match: string, content: string) => {
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
    const hasHTML = /<html[^>]*>/.test(markupWithTailwindClasses)
    const hasHead = /<head[^>]*>/.test(markupWithTailwindClasses)

    if (headStyles.length > 0 && (!hasHTML || !hasHead))
      throw new Error('Tailwind: To use responsive styles you must have a <EHtml> and <EHead> element in your template.')

    const dom = htmlparser2.parseDocument(markupWithTailwindClasses, {
      decodeEntities: false,
      xmlMode: true,
    })

    const head = domutils.findOne(elem => elem.name === 'head', dom.children)

    if (headStyles.length > 0 && hasHead && head) {
      domutils.appendChild(head, {
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

    domutils
      .findAll(elem => hasAttrs(elem), dom.children)
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
      return h('clean-component', { innerHTML: html })
    }
  },
})
