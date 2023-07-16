import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { useRenderClient } from 'src'
import Hr from '../Hr.vue'

describe('render', () => {
  it('renders the <Hr> component', () => {
    const component = h(Hr)

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><hr data-id=\\"__vue-email-hr\\" style=\\"width: 100%; border-top: 1px solid #eaeaea;\\">"',
    )
  })
})
