import type { CSSProperties, PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { withMargin } from './utils'

export const Heading = defineComponent({
  name: 'Heading',
  props: {
    as: {
      type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
      default: 'h1',
    },
    m: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mx: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    my: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mt: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mr: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mb: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    ml: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties | string>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const styleObject = computed(() => {
      if (typeof props.style === 'string' || Array.isArray(props.style)) {
        return {};
      }
      return props.style as CSSProperties;
    });

    return () => {
      return h(
        props.as!,
        {
          'style': {
            ...withMargin({
              m: props.m,
              mx: props.mx,
              my: props.my,
              mt: props.mt,
              mr: props.mr,
              mb: props.mb,
              ml: props.ml,
            }),
            ...styleObject.value,
          },
        },
        slots.default?.(),
      )
    }
  },
})
