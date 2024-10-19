import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Body } from '@vue-email/body'
import { Html } from '@vue-email/html'
import { Head } from '@vue-email/head'
import { Tailwind } from './src/index'
// import TailwindTest from '../components/TailwindTest.vue'

describe('tailwind component', () => {
  describe('inline styles', () => {
    it('should render children with inline Tailwind styles', async () => {
      const component = h(Tailwind, {
        config: {
          theme: {
            extend: {
              colors: {
                'test': '#fcba03'
              }
            }
          }
        }
      }, [
        h(
          'div',
          {
            class: 'bg-test text-white',
          },
          [
            'Hello world'
          ]
        ),
        h(Tailwind, [
          h(
            'div',
            {
              class: 'bg-test text-white',
            },
            [
              'custom background'
            ]
          ),
        ])
      ])

      const actualOutput = await render(component)

      expect(actualOutput).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div class="bg-test text-white" style="background-color: rgb(252,186,3); color: rgb(255,255,255);">Hello world</div><div class="bg-test" style="color: rgb(255,255,255); background-color: rgb(252,186,3);">custom background</div>"',
      )
    })

    it('should render with inline Tailwind styles that contain @media styles', async () => {
      const component = h(Tailwind, [
          h(Html, [
            h(Head),
            h(Body,  { class: 'w-full max-w-[650px] md:p-7'}, [
              h(
                'div',
                [
                  // Tailwind generate `container` class that has @media styles
                  // @see https://tailwindcss.com/docs/content-configuration#discarding-classes
                  'The text contains a container word that generate Tailwind class `.container`'
                ]
              ),
              h(
                'div',
                {
                  class: 'text-[#42B883]',
                },
                [
                  'custom background'
                ]
              ),
            ])
        ])
      ])


      const actualOutput = await render(component)

      expect(actualOutput).toMatchInlineSnapshot(
        `"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html lang="en" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="x-apple-disable-message-reformatting"></meta></meta></head><body class="md:p-7" style="width: 100%; max-width: 650px;"><div>The text contains a container word that generate Tailwind class \`.container\`</div><div class="text-[#42B883]" style="color: rgb(66,184,131);">custom background</div></body></html>"`,
      )
    })
  })

  // describe('vue component with children', () => {
  //   it('should render children with inline Tailwind styles', async () => {
  //     const component = h(TailwindTest, {
  //       username: 'John Doe',
  //       inviteFromIp: '172.0.0.1',
  //       inviteFromLocation: 'San Francisco, CA',
  //     })

  //     const actualOutput = await render(component)

  //     console.log(actualOutput)

  //     expect(actualOutput).toMatchInlineSnapshot(
  //       '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div class="bg-white my-auto mx-auto font-sans" style="background-color:rgb(255,255,255);color:rgb(0,0,0);"> <div class="text-primary text-14px leading-24px" style="background-color:rgb(255,255,255);color:rgb(0,0,0);">Hello John Doe,</div> <div class="text-primary text-14px leading-24px" style="background-color:rgb(255,255,255);color:rgb(0,0,0);"> custom background</div> </div>"',
  //     )
  //   })
  // })


})
