import { defineComponent, h } from 'vue'

export const Head = defineComponent({
  name: 'Head',
  setup(_, { slots }) {
    return () => {
      return h('head', [
        h('meta', { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' }),
        h('meta', { name: 'x-apple-disable-message-reformatting' }),
        slots.default?.()
      ])
    }
  },
})
