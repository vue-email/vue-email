import { describe, it, expect } from 'vitest'
import Html from '../Html.vue'
import { h } from 'vue'
import { useRenderClient } from 'src'

describe('render', () => {
  it('renders the <Html> component', () => {
    const component = h(Html)

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><html id=\\"__vue-email\\" lang=\\"en\\" dir=\\"ltr\\"></html>"',
    )
  })
})
