import { defineComponent, h } from 'vue'

export const Style = defineComponent({
  name: 'Style',
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
