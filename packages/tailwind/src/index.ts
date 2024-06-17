import type { CSSProperties, PropType, VNode, VNodeArrayChildren, VNodeChild, VueElement } from 'vue'
import { defineComponent, getTransitionRawChildren, h, isVNode } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { useTailwindStyles } from './utils/hooks/use-tailwind-styles'
import { useStyleInlining } from './utils/hooks/use-style-inlining'
import { sanitizeClassName } from './utils/compatibility/sanitize-class-name'
import { minifyCss } from './utils/css/minify-css'
import type { TailwindConfig } from './utils'

interface EmailElementProps {
  children?: VNodeArrayChildren
  class?: string
  style?: CSSProperties
  tw?: string
  href?: string
}

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
      throw new Error('ETailwind component must have a default slot')

    const $default = slots.default()

    const markup = await renderToString(h('div', $default)).then(html => html.replace(/^<div[^>]*>|<\/div>$/g, ''))

    const { stylePerClassMap, nonInlinableClasses, sanitizedMediaQueries }
      = await useTailwindStyles(markup, props.config)

    const inline = useStyleInlining(stylePerClassMap)

    const nonInlineStylesToApply = sanitizedMediaQueries.filter(
      style => style.trim().length > 0,
    )

    const hasNonInlineStylesToApply = nonInlineStylesToApply.length > 0
    let hasAppliedNonInlineStyles = false as boolean

    function processElement(
      element: any,
    ): VueElement | VNodeChild | VNodeArrayChildren {
      const propsToOverwrite = {} as Partial<EmailElementProps>

      if (!hasAppliedNonInlineStyles && hasNonInlineStylesToApply) {
        if (element.type === 'EHead' || element.type.name === 'EHead') {
          hasAppliedNonInlineStyles = true

          const children = element.children?.default() ?? []

          const styleElement = h('style', {
            innerHTML: minifyCss(nonInlineStylesToApply.join('')),
          })

          children.push(styleElement)

          return h(element.type, element.props, children)
        }
      }

      if (element.children) {
        if (Array.isArray(element.children)) {
          const processedChillren = element.children.map((child: any) => {
            if (isVNode(child)) {
              const element = child as VNode
              return processElement(element)
            }

            return child
          })

          propsToOverwrite.children
            = processedChillren && processedChillren.length === 1
              ? processedChillren[0]
              : processedChillren
        }
        else if (typeof element.children === 'object') {
          const child = element.children?.default()

          const processedChillren = child.map((child: any) => {
            if (isVNode(child)) {
              const element = child as VNode
              return processElement(element)
            }

            return child
          })

          propsToOverwrite.children
            = processedChillren && processedChillren.length === 1
              ? processedChillren[0]
              : processedChillren
        }
        else {
          propsToOverwrite.children = [element.children]
        }
      }

      if (element.props?.class) {
        const { styles, residualClassName } = inline(element.props.class)
        propsToOverwrite.style = {
          ...element.props.style,
          ...styles,
        }
        if (residualClassName.trim().length > 0) {
          propsToOverwrite.class = residualClassName
          /*
            We sanitize only the class names of Tailwind classes that we are not going to inline
            to avoid unpredictable behavior on the user's code. If we did sanitize all class names
            a user-defined class could end up also being sanitized which would lead to unexpected
            behavior and bugs that are hard to track.
          */
          for (const singleClass of nonInlinableClasses) {
            propsToOverwrite.class = propsToOverwrite.class.replace(
              singleClass,
              sanitizeClassName(singleClass),
            )
          }
        }
        else {
          propsToOverwrite.class = undefined
        }
      }

      const newProps = {
        ...element.props,
        ...propsToOverwrite,
      }

      const newChildren = propsToOverwrite.children
        ? propsToOverwrite.children
        : element.props?.children

      return h(element.type as any, newProps, newChildren)
    }

    const children = getTransitionRawChildren($default)

    const childrenArray = children.map((child) => {
      if (isVNode(child)) {
        const element = child
        return processElement(element)
      }

      return child
    }) ?? []

    if (hasNonInlineStylesToApply && !hasAppliedNonInlineStyles) {
      throw new Error(
        `You are trying to use the following Tailwind classes that have media queries: ${nonInlinableClasses.join(
          ' ',
        )}.
For the media queries to work properly on rendering, they need to be added into a <style> tag inside of a <head> tag,
the Tailwind component tried finding a <head> element but just wasn't able to find it.

Make sure that you have either a <head> element at some point inside of the <Tailwind> component at any depth.

If you do already have a <head> element at some depth, please file a bug https://github.com/resend/react-email/issues/new?assignees=&labels=Type%3A+Bug&projects=&template=1.bug_report.yml.`,
      )
    }

    return () => childrenArray
  },
})
