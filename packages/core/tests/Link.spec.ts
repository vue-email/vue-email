import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ELink, useRender } from '../src'

describe('render', () => {
  it('renders the <Link> component', async () => {
    const component = h(
      ELink,
      {
        href: 'https://example.com',
      },
      {
        default: () => 'Lorem ipsum',
      },
    )

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a data-id=\\"__vue-email-link\\" style=\\"color: #067df7; text-decoration: none\\" href=\\"https://example.com\\" target=\\"_blank\\">Lorem ipsum</a>"',
    )
  })
})
