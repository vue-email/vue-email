import { defineComponent, h } from 'vue'

export const Link = defineComponent({
  name: 'Link',
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: '_blank',
    }
  },
  setup(props, { slots }) {
    return () => {
      return h(
        'a',
        {
          'style': 'color: #067df7; text-decoration: none',
          'href': props.href,
          'target': props.target,
        },
        slots.default?.(),
      )
    }
  },
})
