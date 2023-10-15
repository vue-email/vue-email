import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EText, useRender } from '../src'

describe('render', () => {
  it('renders the <Text> component', async () => {
    const component = h(EText, undefined, {
      default: () => 'Lorem ipsum',
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><p data-id=\\"__vue-email-text\\" style=\\"font-size: 14px; line-height: 24px; margin: 16px 0;\\">Lorem ipsum</p>"`,
    )
  })
})
