import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ETailwind, useRender } from '../src'
import MyEmail from './components/MyEmail.vue'

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
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div class="bg-black text-white" style="background-color: rgb(0,0,0); color: rgb(255,255,255);">Hello world</div>"',
      )
    })

    it('should render correct styles for nested components', async () => {
      const actualOutput = await useRender(MyEmail)

      expect(actualOutput.html).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><table align="center" width="100%" data-id="__vue-email-section" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0; text-align: center;" class="text-accent myemail-class"> MyEmail Component </p><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0; text-align: center;" class="text-accent base-email"> BaseEmail Component </p><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0; text-align: center;" class="text-accent footer-class"> Footer Component </p></td></tr></tbody></table>"',
      )
    })
  })
})
