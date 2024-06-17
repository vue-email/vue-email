import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

type FallbackFont =
  | 'Arial'
  | 'Helvetica'
  | 'Verdana'
  | 'Georgia'
  | 'Times New Roman'
  | 'serif'
  | 'sans-serif'
  | 'monospace'
  | 'cursive'
  | 'fantasy'

type FontFormat =
  | 'woff'
  | 'woff2'
  | 'truetype'
  | 'opentype'
  | 'embedded-opentype'
  | 'svg'

type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number
type FontStyle = 'normal' | 'italic' | 'oblique'

export const Font = defineComponent({
  name: 'Font',
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
      type: Object as PropType<{ url: string, format: FontFormat }>,
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
  setup({ fontFamily, fallbackFontFamily, webFont, fontStyle, fontWeight }) {
    const src = webFont
      ? `src: url(${webFont.url}) format('${webFont.format}');`
      : ''

    const style = `
      @font-face {
        font-family: '${fontFamily}';
        font-style: ${fontStyle};
        font-weight: ${fontWeight};
        mso-font-alt: '${Array.isArray(fallbackFontFamily)
        ? fallbackFontFamily[0]
        : fallbackFontFamily
      }';
        ${src}
      }
  
      * {
        font-family: '${fontFamily}', ${Array.isArray(fallbackFontFamily)
        ? fallbackFontFamily.join(', ')
        : fallbackFontFamily
      };
      }
    `

    return () => {
      return h('style', {
        innerHTML: style,
      })
    }
  },
})
