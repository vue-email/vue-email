import type { CSSProperties, VNode } from 'vue'
import { cloneVNode, defineComponent, h, isVNode } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { Config as TailwindOriginalConfig } from 'tailwindcss'
import { useRgbNonSpacedSyntax } from '../utils/tailwind/use-rgb-non-spaced-syntax'
import { getCssForMarkup } from '../utils/tailwind/get-css-for-markup'
import { getStylesPerClassMap } from '../utils/tailwind/get-css-class-properties-map'
import { escapeClassName } from '../utils/tailwind/escape-class-name'
import { cssToJsxStyle } from '../utils/tailwind/css-to-jsx-style'
import { minifyCss } from '../utils/tailwind'

export type TailwindConfig = Omit<TailwindOriginalConfig, 'content'>

function processElement(
  element: VNode,
  nonMediaQueryTailwindStylesPerClass: Record<string, string>,
): any {
  let modifiedElement: VNode = element

  let resultingClassName = modifiedElement.props?.class as
    | string
    | undefined

  let resultingStyle = modifiedElement.props?.style as
    | CSSProperties
    | undefined

  let resultingChildren: any[] = []

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

    if (modifiedElement.children) {
      if (Array.isArray(modifiedElement.children)) {
        const vnodes = modifiedElement.children.map((child) => {
          if (isVNode(child))
            return processElement(child, nonMediaQueryTailwindStylesPerClass)

          return child
        })

        resultingChildren = [...vnodes]
      }
      else {
        const vnodes = [modifiedElement.children].map((child) => {
          if (isVNode(child))
            return processElement(child, nonMediaQueryTailwindStylesPerClass)

          return child
        })

        resultingChildren = [...vnodes]
      }
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

    modifiedElement.children = resultingChildren

    return h(modifiedElement)
  }
}

function processHead(
  headElement: VNode,
  responsiveStyles: string[],
): VNode {
  const styleElement = h('style', minifyCss(responsiveStyles.join('')))

  return h(headElement, null, [
    styleElement,
  ])
}

export default defineComponent({
  name: 'ETailwind',
  props: {
    config: {
      type: Object as () => TailwindConfig,
      required: false,
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default())
      throw new Error('ETailwind component must have content')

    const $default = slots.default()

    let headStyles: string[] = []
    const markupWithTailwindClasses = await renderToString(h('div', $default)).then(html => html.replace(/^<div[^>]*>|<\/div>$/g, ''))
    const markupCSS = useRgbNonSpacedSyntax(
      await getCssForMarkup(markupWithTailwindClasses, props.config),
    )
    const nonMediaQueryCSS = markupCSS.replaceAll(
      /@media\s*\(.*\)\s*{\s*\.(.*)\s*{[\s\S]*}\s*}/gm,
      (mediaQuery, _className) => {
        headStyles.push(
          mediaQuery
            .replace(/[\r\n|\r|\n]+/g, '')
            .replace(/\s+/g, ' ')
            .replaceAll(/\s*\.[\S]+\s*{([^}]*)}/gm, (match, content: string) => {
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
      .filter(([child]) => isVNode(child))

    let headElementIndex = -1

    validElementsWithIndexes.forEach(([element, i]) => {
      childrenArray[i] = processElement(element, nonMediaQueryTailwindStylesPerClass)

      if (element.type === 'head' || (typeof element.type === 'function' && 'name' in element.type && element.type.name === 'Head'))
        headElementIndex = i
    })

    headStyles = headStyles.filter(style => style.trim().length > 0)

    if (headStyles.length > 0) {
      if (headElementIndex === -1) {
        throw new Error(
          'Tailwind: To use responsive styles you must have a <head> element as a direct child of the Tailwind component.',
        )
      }

      const [headElement, headAllElementsIndex] = validElementsWithIndexes[
        headElementIndex
      ] as [VNode, number]

      childrenArray[headAllElementsIndex] = processHead(headElement, headStyles)
    }

    return () => childrenArray
  },
  render() {
    return h('render')
  },
})
