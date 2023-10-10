import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

type FallbackFont = 'Arial' | 'Helvetica' | 'Verdana' | 'Georgia' | 'Times New Roman'
type FontFormat = 'woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg'
type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number
type FontStyle = 'normal' | 'italic' | 'oblique'

export default defineComponent({
  name: 'EFont',
  props: {
    fontFamily: {
      type: String,
      required: true,
    },
    fallbackFontFamily: {
      type: [String, Array] as PropType<FallbackFont | FallbackFont[]>,
      default: 'Arial',
    },
    webFont: {
      type: Object as PropType<{ url: string; format: FontFormat }>,
      default: undefined,
    },
    fontStyle: {
      type: String as PropType<FontStyle>,
      default: 'normal',
    },
    fontWeight: {
      type: [String, Number] as PropType<FontWeight>,
      default: 400,
    },
  },
  setup(props) {
    const src = props.webFont ? `src: url(${props.webFont.url}) format("${props.webFont.format}");` : ''

    const styles = `@font-face {
font-family: "${props.fontFamily}";
font-style: ${props.fontStyle};
font-weight: ${props.fontWeight};
mso-font-alt: "${Array.isArray(props.fallbackFontFamily) ? props.fallbackFontFamily[0] : props.fallbackFontFamily}";
${src}
}

* {
font-family: "${props.fontFamily}", ${Array.isArray(props.fallbackFontFamily) ? props.fallbackFontFamily.join(', ') : props.fallbackFontFamily};
}`

    return () => {
      return h('style', undefined, {
        default: () => styles,
      })
    }
  },
})
