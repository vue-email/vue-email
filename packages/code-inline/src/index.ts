import type { CSSProperties, PropType } from 'vue'
import { defineComponent, h } from 'vue'

export const CodeInline = defineComponent({
  name: 'CodeInline',
  props: {
    class: {
      type: String,
      default: '',
    },
    style: {
      type: Object as PropType<CSSProperties>,
    },
  },
  setup(props, { slots }) {
    return () =>
      [h('style', null, `
      meta ~ .cino {
        display: none !important;
        opacity: 0 !important;
      }

      meta ~ .cio {
        display: block !important;
      }
    `), h('code', {
        ...props,
        class: [
          props.class,
          'cino',
        ],
        style: props.style,
      }, slots.default?.()), h('span', {
        ...props,
        class: [
          props.class,
          'cio',
        ],
        style: { ...props.style, display: 'none' },
      }, slots.default?.())]
  },
})
