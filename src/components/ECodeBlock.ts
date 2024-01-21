import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import type { BundledLanguage, BundledTheme, SpecialLanguage, ThemeRegistrationAny } from 'shikiji'
import { getHighlighter } from 'shikiji'

export default defineComponent({
  name: 'ECodeBlock',
  props: {
    code: {
      type: String,
      required: true,
    },
    lang: {
      type: String as PropType<BundledLanguage | SpecialLanguage>,
      required: true,
    },
    theme: {
      type: String as PropType<BundledTheme | ThemeRegistrationAny>,
      required: true,
    },
    class: {
      type: String,
      default: '',
    },
  },
  async setup({ code, lang, theme }) {
    const shiki = await getHighlighter({
      langs: [lang],
      themes: [theme],
    })

    const themeColorBg = shiki.getTheme(theme).bg
    const htmlCode = shiki.codeToThemedTokens(code, {
      lang,
      theme,
    })

    return () =>
      h('pre', {
        class: ['shiki', theme],
        style: {
          backgroundColor: themeColorBg,
          display: 'block',
          whiteSpace: 'pre',
          fontFamily: 'monospace',
        },
        tabindex: 0,
      }, [
        h('code', null, [
          ...htmlCode.map((line) => {
            return h('span', { class: ['line'], style: {
              display: 'table-row',
              lineHeight: '1.5',
              height: '1.5em',
            } }, [
              ...line.map((token) => {
                return h('span', { style: { color: token.color } }, token.content)
              }),
            ])
          }),
        ]),
      ])
  },
})
