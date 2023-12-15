import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EHr',
  setup() {
    return () => {
      return h('hr', {
        'data-id': '__vue-email-hr',
        'style': 'width: 100%; border: none; border-top: 1px solid #eaeaea;',
      })
    }
  },
})
