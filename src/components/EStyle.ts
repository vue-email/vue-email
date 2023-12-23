import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EStyle',
  setup(_, { slots }) {
    return () => h('style', {}, slots.default?.())
  },
})
