import { describe, it, expect } from 'vitest'
import Text from '../Text.vue'
import { h } from 'vue'
import { useRender } from 'src'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Text> component', () => {
    const component = h(Text, undefined, {
      default: () => innerText,
    })

    const actualOutput = useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><p data-id=\\"__vue-email-text\\" style=\\"font-size: 14px; line-height: 24px; margin: 16px 0px;\\">${innerText}</p>"`,
    )
  })
})
