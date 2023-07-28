import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ESection, useRender } from 'src'

describe('render', () => {
  it('renders the <Section> component', async () => {
    const component = h(ESection, undefined, {
      default: () => 'Lorem ipsum',
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-section\\" border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\" role=\\"presentation\\"><tbody><tr><td>Lorem ipsum</td></tr></tbody></table>"',
    )
  })

  it('renders the <Section> with <td> wrapper if no <Column> is provided', async () => {
    const component = h(ESection, undefined, {
      default: () => h('div', undefined, 'Lorem ipsum'),
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toContain('<td>')
  })

  it('renders the <Section> with <td> wrapper if <Column> is provided', async () => {
    const component = h(ESection, undefined, {
      default: () => h('td', undefined, 'Lorem ipsum'),
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toContain('<td>')
  })

  it('renders the <Section> wrapping any child provided in a <td> tag', async () => {
    const component = h(ESection, undefined, {
      default: () => [
        h('div', undefined, 'Lorem ipsum'),
        h('p', undefined, 'Lorem ipsum'),
        h('img', {
          src: 'lorem.ipsum',
          alt: 'lorem ipsum',
        }),
      ],
    })

    const actualOutput = await useRender(component)
    const tdChildrenArr = actualOutput.match(/<td\s*.*?>.*?<\/td>/g)

    expect(tdChildrenArr).toHaveLength(1)
  })
})
