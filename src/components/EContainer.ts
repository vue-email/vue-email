import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EmailContainer',
  setup(_, { slots }) {
    return () => {
      return h(
        'table',
        {
          'align': 'center',
          'width': '100%',
          'data-id': '__vue-email-container',
          'role': 'presentation',
          'cellspacing': '0',
          'cellpadding': '0',
          'border': '0',
          'style': 'max-width: 37.5em',
        },
        [h('tbody', [h('tr', { style: 'width: 100%' }, [h('td', {}, slots.default?.())])])],
      )
    }
  },
})
