import { describe, it, expect } from 'vitest'
import Section from '../Section.vue'
import { h } from 'vue'
import { useRender } from 'src'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Section> component', () => {
    const component = h(Section, undefined, {
      default: () => innerText,
    })

    const actualOutput = useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-section\\" border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\" role=\\"presentation\\"><tbody><tr><td>${innerText}</td></tr></tbody></table>"`,
    )
  })

  it('renders the <Section> with <td> wrapper if no <Column> is provided', () => {
    const component = h(Section, undefined, {
      default: () => h('div', undefined, innerText),
    })

    const actualOutput = useRender(component)

    expect(actualOutput).toContain('<td>')
  })

  it('renders the <Section> with <td> wrapper if <Column> is provided', () => {
    const component = h(Section, undefined, {
      default: () => h('td', undefined, innerText),
    })

    const actualOutput = useRender(component)

    expect(actualOutput).toContain('<td>')
  })

  it('renders the <Section> wrapping any child provided in a <td> tag', () => {
    const component = h(Section, undefined, {
      default: () => [
        h('div', undefined, innerText),
        h('p', undefined, innerText),
        h('img', {
          src: 'lorem.ipsum',
          alt: 'lorem ipsum',
        }),
      ],
    })

    const actualOutput = useRender(component)
    const tdChildrenArr = actualOutput.match(/<td\s*.*?>.*?<\/td>/g)

    expect(tdChildrenArr).toHaveLength(1)
  })
})
