import { describe, it, expect } from 'vitest'
import Hr from '../Hr.vue'
import { h } from 'vue'
import { useRender } from 'src'

describe('render', () => {
  it('renders the <Hr> component', () => {
    const component = h(Hr)

    const actualOutput = useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><hr data-id=\\"__vue-email-hr\\" style=\\"width: 100%; border-top: 1px solid #eaeaea;\\">"',
    )
  })
})
