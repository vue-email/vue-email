import { computed, defineComponent, h } from 'vue'

const PREVIEW_MAX_LENGTH = 150

export const renderWhiteSpace = (text: string) => {
  if (text.length >= PREVIEW_MAX_LENGTH) {
    return null;
  }
  const whiteSpaceCodes = "\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF";
  return h('div', [whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length)])
};


export const Preview = defineComponent({
  name: 'Preview',
  setup(_, { slots }) {
    const text = computed(() => {
      if (slots.default !== undefined) {
        const children = slots.default()[0].children as string
        const newText = Array.isArray(children) ? children.join('') : children

        return newText?.substring(0, PREVIEW_MAX_LENGTH)
      }

      return ''
    })

    return () => {
      return h(
        'div',
        {
          style: {
            display: 'none',
            overflow: 'hidden',
            lineHeight: '1px',
            opacity: 0,
            maxHeight: 0,
            maxWidth: 0,
          }
        },
        [text.value, renderWhiteSpace(text.value)],
      )
    }
  },
})
