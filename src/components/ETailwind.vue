<script setup lang="ts">
import { type VNode, defineComponent, h, ref, useAttrs, useSlots } from 'vue'
import { type TailwindConfig, tailwindToCSS } from 'tw-to-css'
import { cleanCss, getMediaQueryCss, makeCssMap } from '../utils/css'

const props = defineProps<Props>()

interface Props {
  config?: TailwindConfig
}
const render = defineComponent(() => {
  const attrs = useAttrs()
  const slots = useSlots()

  const { twi } = tailwindToCSS({ config: props.config })
  const hasHTML = ref(false)
  const hasHead = ref(false)
  const hasResponsiveStyles = ref(false)
  const classes = ref<string[]>([])
  const css = ref<string>('')
  const tailwindCss = ref<string>('')
  const cssMap = ref<Record<string, string>>({})
  const headStyle = ref<string>('')

  if (!slots.default || !slots.default()) {
    throw new Error('You must insert at least one code')
  }

  const $default = slots.default()
  const headNamePattern = /^(head|e-head|ehead)$/i

  const vName = (v: VNode) => {
    return typeof v.type === 'string'
      ? v.type.toLowerCase()
      : typeof v.type === 'object' && v.type !== null && 'name' in v.type
      ? (v.type as { name: string }).name.toLowerCase()
      : ''
  }

  const helper = (v: any) => {
    const typeName = vName(v)

    if (hasHead.value && hasResponsiveStyles.value && typeName && headNamePattern.test(typeName)) {
      v.children = [h('style', headStyle.value)]
    }

    if (v.props && v.props.class) {
      const cleanRegex = /[:#\\!\-[\]\\/\\.%]+/g

      const cleanTailwindClasses = v.props.class.replace(cleanRegex, '_')

      let currentStyles = ''

      if (v.props && typeof v.props.style === 'object') {
        currentStyles = Object.keys(v.props.style)
          .map((key) => {
            return `${key}: ${v.props?.style[key]};`
          })
          .join(' ')
      }

      const tailwindStyles = cleanTailwindClasses
        .split(' ')
        .map((className: any) => {
          return cssMap.value[`.${className}`]
        })
        .join(';')

      v.props.style = `${currentStyles} ${tailwindStyles}`.trim()

      v.props.class = v.props.class
        .split(' ')
        .filter((className: any) => className.search(/^.{2}:/) !== -1)
        .join(' ')
        .replace(cleanRegex, '_')

      if (v.props.class === '') {
        delete v.props.class
      }
    }

    if (v.children) {
      const defaultChildren = v.children.default?.()

      if (defaultChildren && Array.isArray(defaultChildren) && defaultChildren.length) {
        v.children.default = () => defaultChildren.map((vnode: VNode) => helper(vnode))
      } else if (v.children && Array.isArray(v.children)) {
        v.children = v.children.map((vnode: VNode) => helper(vnode))
      }
    }

    return h(v)
  }

  const $forEachHelper = (vnode: any) => {
    if (vnode.props && vnode.props.class) {
      classes.value.push(vnode.props.class)
    }

    const typeName = vName(vnode)

    if (typeName && typeName.includes('html')) {
      hasHTML.value = true
    }

    if (typeName && headNamePattern.test(typeName)) {
      hasHead.value = true
    }

    if (typeof vnode.children === 'object' && vnode.children) {
      const defaultChildren = vnode.children.default?.()

      if (defaultChildren && Array.isArray(defaultChildren) && defaultChildren.length) {
        defaultChildren.forEach($forEachHelper)
      } else if (vnode.children && Array.isArray(vnode.children)) {
        vnode.children.forEach($forEachHelper)
      }
    }
  }

  $default.forEach($forEachHelper)

  tailwindCss.value = twi(classes.value.join(' '), {
    merge: false,
    ignoreMediaQueries: false,
  })

  css.value = cleanCss(tailwindCss.value)
  cssMap.value = makeCssMap(css.value)
  headStyle.value = getMediaQueryCss(css.value)
  hasResponsiveStyles.value = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm.test(headStyle.value)

  return () =>
    h(
      'div',
      {
        ...attrs,
      },
      $default.map((vnode) => helper(vnode)),
    )
})
</script>

<template>
  <render>
    <slot></slot>
  </render>
</template>
