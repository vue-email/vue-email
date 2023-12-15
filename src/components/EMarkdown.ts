import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'
import { parseMarkdownToVueEmailJSX } from '../utils'
import type { StylesType } from '../types'

export default defineComponent({
  name: 'EMarkdown',
  props: {
    source: {
      type: String,
      required: true,
    },
    customStyles: {
      type: Object as () => StylesType,
      default: undefined,
    },
    containerStyles: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  async setup(props) {
    const parsedMarkdown = await parseMarkdownToVueEmailJSX(props.source, props.customStyles)

    return () => {
      return h('div', {
        'data-id': '__vue-email-markdown',
        'style': props.containerStyles,
        'innerHTML': parsedMarkdown,
      })
    }
  },
})
