import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'ESection',
  setup(_, { slots }) {
    return () => {
      return h(
        'table',
        {
          'align': 'center',
          'width': '100%',
          'data-id': '__vue-email-section',
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
