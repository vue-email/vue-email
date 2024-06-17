import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EText',
  setup(_, { slots }) {
    return () => {
      return h(
        'p',
        {
          'style': {
            fontSize: '14px',
            lineHeight: '24px',
            margin: '16px 0',
          },
        },
        slots.default?.(),
      )
    }
  },
})
