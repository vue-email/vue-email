import { defineComponent, h } from 'vue'

export const Section = defineComponent({
  name: 'Section',
  setup(_, { slots }) {
    return () => {
      return h(
        'table',
        {
          'align': 'center',
          'width': '100%',
          'border': '0',
          'cellPadding': '0',
          'cellSpacing': '0',
          'role': 'presentation',
        },
        [h('tbody', [h('tr', [h('td', slots.default?.())])])],
      )
    }
  },
})
