import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import type { BundledLanguage, BundledTheme, SpecialLanguage, ThemeRegistrationAny } from 'shiki'

export const CodeBlock = defineComponent({
  name: 'CodeBlock',
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
    lineHighlightingColor: {
      type: String,
      default: 'rgba(101, 117, 133, .16)',
    },
    highlightedLines: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },
  async setup({ code, lang, theme, showLineNumbers, lineNumberColor, highlightedLines, lineHighlightingColor }) {
    const { getHighlighter } = await import('shiki')

    if (!getHighlighter)
      throw new Error('Shiki is not available')

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
          code(node) {
            node.properties.style = 'display: table; width: 100%;'
          },
        },
        {
          line(node, line) {
            node.properties.style = 'display: table-row; line-height: 1.5; height: 1.5em;'

            if (showLineNumbers) {
              node.children.unshift({
                type: 'element',
                tagName: 'span',
                properties: {
                  className: ['line-number'],
                  style: `padding-left: 5px; padding-right: 15px; color: ${lineNumberColor}; user-select: none;`,
                },
                children: [
                  {
                    type: 'text',
                    value: `${line}`,
                  },
                ],
              })
            }

            if (highlightedLines.includes(line))
              node.properties.style += `background-color: ${lineHighlightingColor};`
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
