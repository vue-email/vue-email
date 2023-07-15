import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { useRenderClient } from 'src'
import Link from '../Link.vue'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Link> component', () => {
    const component = h(
      Link,
      {
        href: 'https://example.com',
      },
      {
        default: () => innerText,
      },
    )

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a data-id=\\"__vue-email-link\\" style=\\"color: rgb(6, 125, 247); text-decoration: none;\\" href=\\"https://example.com\\" target=\\"_blank\\">${innerText}</a>"`,
    )
  })
})
