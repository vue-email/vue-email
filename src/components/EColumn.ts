import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EColumn',
  setup(_, { slots }) {
    return () => {
      return h(
        'td',
        {
          'data-id': '__vue-email-column',
          'role': 'presentation',
        },
        slots.default?.(),
      )
    }
  },
})
