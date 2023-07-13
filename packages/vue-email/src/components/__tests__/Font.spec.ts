import { describe, it, expect } from 'vitest'
import Font from '../Font.vue'
import { h } from 'vue'
import { useRenderClient } from 'src'

describe('render', () => {
  it('renders the <Font> component', () => {
    const component = h(Font, {
      fontFamily: 'Roboto',
      fallbackFontFamily: 'Verdana',
    })

    const actualOutput = useRenderClient(component)

    console.log(actualOutput)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><style>@font-face {
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
mso-font-alt: 'Verdana';

}

* {
font-family: 'Roboto', Verdana;
}</style>"`,
    )
  })
})
