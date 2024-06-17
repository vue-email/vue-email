import { defineComponent, h } from 'vue'

export const Text = defineComponent({
  name: 'Text',
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
