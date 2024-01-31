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
    showLineNumbers: {
      type: Boolean,
      default: false,
    },
    lineNumberColor: {
      type: String,
      default: '#636E7B',
    },
  },
  async setup({ code, lang, theme, showLineNumbers, lineNumberColor }) {
    const shiki = await getHighlighter({
      langs: [lang],
      themes: [theme],
    })

    const themeColorBg = shiki.getTheme(theme).bg
    const html = shiki.codeToHtml(code, {
      lang,
      theme,
      transformers: [
        {
          line(node, line) {
            node.properties.style = 'display: table-row; line-height: 1.5; height: 1.5em;'

            if (showLineNumbers) {
              node.children.unshift({
                type: 'element',
                tagName: 'span',
                properties: {
                  className: ['line-number'],
                  style: `padding-right: 15px; color: ${lineNumberColor}`,
                },
                children: [
                  {
                    type: 'text',
                    value: `${line}`,
                  },
                ],
              })
            }
          },
        },
      ],
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
        h('span', {
          innerHTML: html,
        }),
      ])
  },
})
