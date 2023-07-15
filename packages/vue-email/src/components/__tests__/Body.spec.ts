import { describe, it, expect } from 'vitest'
import { compile, h } from 'vue'
import { useRenderClient } from 'src'
import Body from '../Body.vue'

describe('render', () => {
  const innerText = 'Hi there!'

  it('renders the <Body> component', () => {
    const component = h(Body, null, {
      default: () => innerText,
    })
    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><body data-id=\\"__vue-email-body\\">${innerText}</body>"`,
    )
  })
})
