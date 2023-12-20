import type { CSSProperties, PropType, VNode } from 'vue'
import { cloneVNode, defineComponent, h, isVNode } from 'vue'
import { renderToString, ssrRenderComponent } from 'vue/server-renderer'

import type { TailwindConfig } from '@vue-email/tailwind'
import { cssToJsxStyle, escapeClassName, getCssForMarkup, getStylesPerClassMap, minifyCss, useRgbNonSpacedSyntax } from '@vue-email/tailwind'

export default defineComponent({
  name: 'ETailwind',
  props: {
    config: {
      type: Object as PropType<TailwindConfig>,
      required: false,
      default: () => ({}),
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default())
      throw new Error('ETailwind component must have content')

    const $default: any = slots.default()
    let headStyles: string[] = []
    const markupWithTailwindClasses = await renderToString(h('div', $default)).then(html => html.replace(/^<div[^>]*>|<\/div>$/g, ''))
    const markupCSS = useRgbNonSpacedSyntax(
      await getCssForMarkup(markupWithTailwindClasses, props.config as TailwindConfig),
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

    const childrenArray = Array.isArray($default) ? $default : [$default]
    const validElementsWithIndexes = childrenArray
      .map((child, i) => [child, i] as [VNode, number])

    let headElementIndex = -1

    validElementsWithIndexes.forEach(([element, i]) => {
      childrenArray[i] = processElement(element, nonMediaQueryTailwindStylesPerClass)

      if ((element.type as any).name === 'EHead')
        headElementIndex = i
    })

    headStyles = headStyles.filter(style => style.trim().length > 0)

    if (headStyles.length > 0) {
      if (headElementIndex === -1) {
        throw new Error(
          'Tailwind: To use responsive styles you must have a <EHead> element as a direct child of the Tailwind component.',
        )
      }

      const [headElement, headAllElementsIndex] = validElementsWithIndexes[
        headElementIndex
      ] as [VNode, number]

      childrenArray[headAllElementsIndex] = processHead(headElement, headStyles)
    }

    return () => childrenArray
  },
})

function processElement(
  element: VNode,
  nonMediaQueryTailwindStylesPerClass: Record<string, string>,
): any {
  let modifiedElement: any = element

  let resultingClassName = modifiedElement.props?.class as
    | string
    | undefined

  let resultingStyle = modifiedElement.props?.style as
    | CSSProperties
    | undefined

  if (modifiedElement.props && modifiedElement.props.class) {
    const fullClassName = modifiedElement.props.class as string
    const classNames = fullClassName.split(' ')
    const classNamesToKeep = [] as string[]

    const styles = [] as string[]

    classNames.forEach((className) => {
      /*                        escape all unallowed characters in css class selectors */
      const escapedClassName = escapeClassName(className)
      // no need to filter in for media query classes since it is going to keep these classes
      // as custom since they are not going to be in the markup map of styles
      if (
        typeof nonMediaQueryTailwindStylesPerClass[escapedClassName]
          === 'undefined'
      ) {
        classNamesToKeep.push(className)
      }
      else {
        styles.push(
              `${nonMediaQueryTailwindStylesPerClass[escapedClassName]};`,
        )
      }
    })

    resultingStyle = {
      ...(modifiedElement.props.style as CSSProperties),
      ...cssToJsxStyle(styles.join(' ')),
    }
    resultingClassName = classNamesToKeep.length > 0
      ? classNamesToKeep.join(' ')
      : undefined
  }

  if (modifiedElement.children) {
    const defaultChildren = modifiedElement.children.default?.()

    if (defaultChildren && Array.isArray(defaultChildren)) {
      modifiedElement.children.default = () => {
        return defaultChildren.map((child) => {
          if (isVNode(child))
            return processElement(child, nonMediaQueryTailwindStylesPerClass)

          return child
        })
      }
    }
    else if (modifiedElement.children && Array.isArray(modifiedElement.children)) {
      const vnodes = modifiedElement.children.map((child: any) => {
        if (isVNode(child))
          return processElement(child, nonMediaQueryTailwindStylesPerClass)

        return child
      })

      modifiedElement.children = [...vnodes]
    }
  }
  else if (modifiedElement.type.__name) {
    modifiedElement = processElement(h(modifiedElement), nonMediaQueryTailwindStylesPerClass)

    // if (defaultChildren && Array.isArray(defaultChildren)) {
    //   modifiedElement.ctx.slots = defaultChildren.map((child) => {
    //     if (isVNode(child))
    //       return processElement(child, nonMediaQueryTailwindStylesPerClass)

    //     return child
    //   })

    //   // modifiedElement = defineComponent({
    //   //   name: modifiedElement.type.__name,
    //   //   setup: (_props, ctx) => () => ctx.slots.default?.(),
    //   // })

    //   return modifiedElement
    // }
    // else if (modifiedElement.children && Array.isArray(modifiedElement.children)) {
    //   const vnodes = modifiedElement.children.map((child: any) => {
    //     if (isVNode(child))
    //       return processElement(child, nonMediaQueryTailwindStylesPerClass)

    //     return child
    //   })

    //   modifiedElement.children = [...vnodes]
    // }
  }

  modifiedElement = cloneVNode(
    modifiedElement,
    {
      ...modifiedElement.props,
      class: resultingClassName,
      // passing in style here as undefined may mess up
      // the rendering process of child components
      ...(typeof resultingStyle === 'undefined'
        ? {}
        : { style: resultingStyle }),
    },
  )
  return modifiedElement
}

function processHead(
  headElement: VNode,
  responsiveStyles: string[],
): VNode {
  headElement.children = [...(headElement.children as any || []), h('style', minifyCss(responsiveStyles.join('')))]

  return headElement
}
