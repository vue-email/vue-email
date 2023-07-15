import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { useRenderClient } from 'src'
import Column from '../Column.vue'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Column> component', () => {
    const component = h(Column, null, {
      default: () => innerText,
    })

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(`
      "<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><td data-id=\\"__vue-email-column\\" role=\\"presentation\\">${innerText}</td>"
    `)
  })
})
