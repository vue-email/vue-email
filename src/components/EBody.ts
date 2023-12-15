import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EBody',
  setup(_, { slots }) {
    return () => {
      const bodyNode: VNode = h('body', { 'data-id': '__vue-email-body' }, slots.default?.())

      return bodyNode
    }
  },
})
