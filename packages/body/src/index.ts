import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Body',
  setup(_, { slots }) {
    return () => {
      const bodyNode: VNode = h('body', slots.default?.())

      return bodyNode
    }
  },
})
