import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'ERow',
  setup(_, { slots }) {
    return () => {
      return h(
        'table',
        {
          'align': 'center',
          'width': '100%',
          'data-id': '__vue-email-row',
          'role': 'presentation',
          'cellSpacing': '0',
          'cellPadding': '0',
          'border': '0',
        },
        [h('tbody', { style: 'width: 100%' }, [h('tr', { style: 'width: 100%' }, slots.default?.())])],
      )
    }
  },
})
