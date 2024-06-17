import { defineComponent, h } from 'vue'

export const Row = defineComponent({
  name: 'Row',
  setup(_, { slots }) {
    return () => {
      return h(
        'table',
        {
          align: 'center',
          width: '100%',
          border: '0',
          cellPadding: '0',
          cellSpacing: '0',
          role: 'presentation',
        },
        [h('tbody', {
          style: {
            width: '100%',
          }
        }, [h('tr', {
          style: {
            width: '100%',
          }
        }, slots.default?.())])],
      )
    }
  },
})
