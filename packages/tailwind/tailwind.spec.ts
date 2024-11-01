import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
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
  })

  it('should render single tags correctly', async () => {
    const component = h(Tailwind, {
    }, [
      h('address', [
        '123 Main St.',
        h('br'),
        'Suite 400',
        h('br'),
        'Springfield, IL',
        h('br'),
        'USA'
      ])
    ])

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><address>123 Main St.<br/>Suite 400<br/>Springfield, IL<br/>USA</address>"',
    )
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
