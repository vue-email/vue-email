import { defineComponent, h } from 'vue'

export const Column = defineComponent({
  name: 'Column',
  setup(_, { slots }) {
    return () => {
      return h(
        'td',
        {
          'role': 'presentation',
        },
        slots.default?.(),
      )
    }
  },
})
