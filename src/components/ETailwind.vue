<script setup lang="ts">
import { h, mergeProps, useSlots } from 'vue'
import { type TailwindConfig, tailwindToCSS } from 'tw-to-css'
import { renderToString } from 'vue/server-renderer'
import { parse } from 'node-html-parser'
import { cleanCss, getMediaQueryCss, makeCssMap } from '../utils/css'

interface Props {
  config?: TailwindConfig
}

const props = defineProps<Props>()
const slots = useSlots()
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

// parse fullHTML to get a structured object
const parsedHTML = parse(fullHTML)

parsedHTML.querySelectorAll('*').forEach((domNode) => {
  if (domNode.nodeType === 1) {
    // Check if the node is an Element
    if (hasResponsiveStyles && hasHead && domNode.tagName === 'head') {
      const props = mergeProps(domNode.attributes)

      const newDomNode = parse(
        `<head ${props}>
          ${domNode.childNodes}
          <style>${headStyle}</style>
        </head>`,
      )

      domNode.replaceWith(newDomNode)
    }

    if (domNode.attributes.class) {
      const cleanRegex = /[:#\!\-[\]\/\.%]+/g
      const cleanTailwindClasses = domNode.attributes.class.replace(cleanRegex, '_')

      const currentStyles = domNode.attributes.style ? `${domNode.attributes.style};` : ''
      const tailwindStyles = cleanTailwindClasses
        .split(' ')
        .map((className) => {
          return cssMap[`.${className}`]
        })
        .join(';')
      domNode.attributes.style = `${currentStyles} ${tailwindStyles}`

      domNode.attributes.class = domNode.attributes.class
        .split(' ')
        .filter((className) => className.search(/^.{2}:/) !== -1)
        .join(' ')
        .replace(cleanRegex, '_')
      if (!domNode.attributes.class) delete domNode.attributes.class
    }
  }
})
</script>

<template>
  <template v-html="fullHTML" />
</template>
