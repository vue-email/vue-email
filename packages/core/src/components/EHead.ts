import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EHead',
  setup(_, { slots }) {
    return () => {
      return h('head', [h('meta', { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' }), slots.default?.()])
    }
  },
})
