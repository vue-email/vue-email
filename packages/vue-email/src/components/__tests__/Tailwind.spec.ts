import { describe, it, expect } from 'vitest'
import Tailwind from '../Tailwind.vue'
import { h } from 'vue'
import { useRenderClient } from 'src'

describe('Tailwind component', () => {
  describe('Inline styles', () => {
    it('should render children with inline Tailwind styles', () => {
      const component = h(Tailwind, undefined, {
        default: () =>
          h('div', {
            class: 'bg-black text-white',
          }),
      })

      const actualOutput = useRenderClient(component)

      expect(actualOutput).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div><div style=\\"background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);\\"></div></div>"',
      )
    })

    // TODO: add more tests
  })
})
