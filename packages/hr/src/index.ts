import { defineComponent, h } from 'vue'

export const Hr = defineComponent({
  name: 'Hr',
  setup() {
    return () => {
      return h('hr', {
        'style': 'width: 100%; border: none; border-top: 1px solid #eaeaea;',
      })
    }
  },
})
