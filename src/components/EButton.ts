import type { PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import { convertStyleStringToObj, pxToPt } from '../utils'

export default defineComponent({
  name: 'EButton',
  props: {
    px: {
      type: [String, Number] as PropType<string | number>,
      default: 0,
    },
    py: {
      type: [String, Number] as PropType<string | number>,
      default: 0,
    },
    target: {
      type: String,
      default: '_blank',
    },
    href: String,
    style: Object,
  },
  setup(props, { slots }) {
    const px = ref(Number.parseInt(`${props.px}`))
    const py = ref(Number.parseInt(`${props.py}`))

    const textRaise = pxToPt((py.value * 2).toString())
    const styles = typeof props.style === 'string' ? convertStyleStringToObj(props.style) : props.style

    const buttonStyle = computed(() => ({
      ...styles,
      lineHeight: '100%',
      textDecoration: 'none',
      display: 'inline-block',
      maxWidth: '100%',
      padding: `${py.value}px ${px.value}px`,
    }))

    const buttonTextStyle = computed(() => ({
      ...styles,
      maxWidth: '100%',
      display: 'inline-block',
      lineHeight: '120%',
      textDecoration: 'none',
      textTransform: 'none',
      msoPaddingAlt: '0px',
      msoTextRaise: pxToPt(py.value.toString()),
    }))

    const firstSpan = `<!--[if mso]><i style="letter-spacing: ${px.value}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`
    const secondSpan = `<!--[if mso]><i style="letter-spacing: ${px.value}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`

    return () => {
      return h(
        'a',
        {
          'data-id': '__vue-email-button',
          style: buttonStyle.value,
          href: props.href,
          target: props.target,
        },
        [
          h('span', { innerHTML: firstSpan }),
          h(
            'span',
            {
              style: buttonTextStyle.value,
            },
            slots.default?.(),
          ),
          h('span', { innerHTML: secondSpan }),
        ],
      )
    }
  },
})
