import { defineComponent, h } from 'vue'

export default defineComponent({
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
