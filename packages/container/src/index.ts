import { CSSProperties, TableHTMLAttributes, defineComponent, h } from 'vue'

export const Container = defineComponent<TableHTMLAttributes>({
  name: 'Container',
  setup(props, { slots }) {
    return () => h(
      'table',
      {
        'align': 'center',
        'width': '100%',
        'role': 'presentation',
        'cellspacing': '0',
        'cellpadding': '0',
        'border': '0',
        'style': {
          'max-width': '37.5em',
          ...props.style as CSSProperties,
        }
      },
      [h('tbody', [h('tr', { style: 'width: 100%' }, [h('td', {}, slots.default?.())])])],
    )
  },
})
