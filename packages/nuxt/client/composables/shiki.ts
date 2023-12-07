import type { Highlighter } from 'shikiji'
import { getHighlighter } from 'shikiji'
import { ref } from 'vue'

export const shiki = ref<Highlighter>()

// TODO: Only loading when needed
getHighlighter({
  themes: ['vitesse-dark'],
  langs: ['html', 'txt', 'md', 'vue', 'vue-html'],
}).then((i) => {
  shiki.value = i
})

export function highlight(code: string, lang: string) {
  if (!shiki.value) return code
  return shiki.value.codeToHtml(code, {
    lang,
    theme: 'vitesse-dark',
  })
}
