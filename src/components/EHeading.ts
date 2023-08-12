import type { CSSProperties, PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { convertStyleStringToObj, withMargin } from '../utils'

export default defineComponent({
  name: 'EHeading',
  props: {
    as: {
      type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
      default: 'h1',
    },
    m: {
      type: String,
      default: undefined,
    },
    mx: {
      type: String,
      default: undefined,
    },
    my: {
      type: String,
      default: undefined,
    },
    mt: {
      type: String,
      default: undefined,
    },
    mr: {
      type: String,
      default: undefined,
    },
    mb: {
      type: String,
      default: undefined,
    },
    ml: {
      type: String,
      default: undefined,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties | string>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const styles = typeof props.style === 'string' ? convertStyleStringToObj(props.style) : props.style

    return () => {
      return h(
        props.as!,
        {
          'data-id': '__vue-email-heading',
          style: {
            ...styles,
            ...withMargin({
              m: props.m,
              mx: props.mx,
              my: props.my,
              mt: props.mt,
              mr: props.mr,
              mb: props.mb,
              ml: props.ml,
            }),
          },
        },
        slots.default?.(),
      )
    }
  },
})
