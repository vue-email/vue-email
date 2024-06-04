import { defineComponent, getCurrentInstance, h, ref } from 'vue'
import { cleanDoubleSlashes, resolveURL } from 'ufo'
import { config } from '../config'

export default defineComponent({
  name: 'EImg',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const src = ref(props.src)

    return () => {
      return h('img', {
        'data-id': '__vue-email-img',
        'style': 'display: block; outline: none; border: none; text-decoration: none',
        'src': src.value,
      })
    }
  },
})
