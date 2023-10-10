import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'ELink',
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      return h(
        'a',
        {
          'data-id': '__vue-email-link',
          style: 'color: #067df7; text-decoration: none',
          href: props.href,
          target: '_blank',
        },
        slots.default?.(),
      )
    }
  },
})
