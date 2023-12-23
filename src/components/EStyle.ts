import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EStyle',
  setup(_, { slots }) {
    return () => {
      return h(
        'style',
        {
          'data-id': '__vue-email-style',
        },
        slots.default?.(),
      )
    }
  },
})
