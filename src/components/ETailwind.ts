import type { CSSProperties, PropType, VNode, VNodeArrayChildren, VNodeChild, VueElement } from 'vue'
import { defineComponent, h } from 'vue'
import { html as _html } from 'satori-html'

import { renderToString } from 'vue/server-renderer'
import { useTailwindStyles } from '../utils/tailwind/hooks/use-tailwind-styles'
import { useStyleInlining } from '../utils/tailwind/hooks/use-style-inlining'
import { sanitizeClassName } from '../utils/tailwind/compatibility/sanitize-class-name'
import { minifyCss } from '../utils/tailwind/css/minify-css'
import type { TailwindConfig } from '../utils/tailwind'

interface EmailElementProps {
  children?: VNodeArrayChildren
  class?: string
  style?: CSSProperties
  tw?: string
}

export default defineComponent({
  name: 'ETailwind',
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
      element: VNode,
    ): VueElement | VNodeChild | VNodeArrayChildren {
      const propsToOverwrite = {} as Partial<EmailElementProps>

      if (!hasAppliedNonInlineStyles && hasNonInlineStylesToApply) {
        if (element.type === 'head') {
          hasAppliedNonInlineStyles = true

          const children = element.props?.children

          const styleElement = h('style', {
            innerHTML: minifyCss(nonInlineStylesToApply.join('')),
          })

          children.push(styleElement)

          return h(element.type, element.props, children)
        }
      }

      if (element.props?.children) {
        let processedChillren = element.props.children

        if (Array.isArray(processedChillren)) {
          processedChillren = element.props?.children.map((child: any) => {
            const element = child as VNode
            return processElement(element)
          })
        }

        propsToOverwrite.children
          = processedChillren && processedChillren.length === 1
            ? processedChillren[0]
            : processedChillren
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

      delete newProps.children
      delete newProps.tw

      const newChildren = propsToOverwrite.children
        ? propsToOverwrite.children
        : element.props?.children

      return h(element.type as any, newProps, newChildren)
    }

    const satoryHTML = await _html(markup)
    const childs = satoryHTML.props && satoryHTML.props.children as VNodeArrayChildren | undefined

    const childrenArray = childs?.map((child) => {
      const element = child as VNode
      return processElement(element)
    })
    ?? []

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

    // return () => childrenArray.map(child => h(child.type, child.props, child.props.children))
    return () => childrenArray
    // return () => null
  },
})
