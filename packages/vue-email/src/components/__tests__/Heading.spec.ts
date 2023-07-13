import { describe, it, expect } from 'vitest'
import Heading from '../Heading.vue'
import { h } from 'vue'
import { useRender } from 'src'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Heading> component', () => {
    const component = h(
      Heading,
      {
        mx: '4',
        as: 'h2',
      },
      {
        default: () => innerText,
      },
    )

    const actualOutput = useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><h2 data-id=\\"__vue-email-heading\\" style=\\"margin-left: 4px; margin-right: 4px;\\">${innerText}</h2>"`,
    )
  })
})
