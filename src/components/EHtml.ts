import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EHtml',
  props: {
    lang: {
      type: String,
      default: 'en',
    },
    dir: {
      type: String as PropType<'ltr' | 'rtl' | 'auto'>,
      default: 'ltr',
    },
  },
  setup(props, { slots }) {
    return () => {
      return h(
        'html',
        {
          id: '__vue-email',
          lang: props.lang,
          dir: props.dir,
        },
        slots.default?.(),
      )
    }
  },
})
