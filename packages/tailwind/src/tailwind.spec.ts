import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import Tailwind from './index'

describe('tailwind component', () => {
  describe('inline styles', () => {
    it('should render children with inline Tailwind styles', async () => {
      const component = h(Tailwind, undefined, {
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

      const actualOutput = await render(component)

      expect(actualOutput).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div class="" style="background-color:rgb(0,0,0);color:rgb(255,255,255);">Hello world</div>"',
      )
    })
  })
})
