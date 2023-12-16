import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ETailwind, useRender } from '../src'

describe('tailwind component', () => {
  describe('inline styles', () => {
    it('should render children with inline Tailwind styles', async () => {
      const component = h(ETailwind, undefined, {
        default: () =>
          h(
            'div',
            {
              class: 'bg-black text-white',
            },
            {
              default: () => 'Hello world',
            },
          ),
      })

      const actualOutput = await useRender(component)

      expect(actualOutput.html).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div style=" background-color:rgb(0,0,0);color:rgb(255,255,255)">Hello world</div>"',
      )
    })

    // TODO: add more tests
  })
})
