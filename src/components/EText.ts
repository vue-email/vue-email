import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EText',
  setup(_, { slots }) {
    return () => {
      return h(
        'p',
        {
          'data-id': '__vue-email-text',
          'style': 'font-size: 14px; line-height: 24px; margin: 16px 0;',
        },
        slots.default?.(),
      )
    }
  },
})
