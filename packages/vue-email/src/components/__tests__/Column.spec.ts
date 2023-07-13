import { describe, it, expect } from 'vitest'
import Column from '../Column.vue'
import { h } from 'vue'
import { useRender } from 'src'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Column> component', () => {
    const component = h(Column, null, {
      default: () => innerText,
    })

    const actualOutput = useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(`
      "<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><td data-id=\\"__vue-email-column\\" role=\\"presentation\\">${innerText}</td>"
    `)
  })
})
