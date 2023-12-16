import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EFont, useRender } from '../src'

describe('render', () => {
  it('renders the <Font> component', async () => {
    const component = h(EFont, {
      fontFamily: 'Roboto',
      fallbackFontFamily: 'Verdana',
    })

    const actualOutput = await useRender(component)

    expect(actualOutput.html).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><style>@font-face {
font-family: &quot;Roboto&quot;;
font-style: normal;
font-weight: 400;
mso-font-alt: &quot;Verdana&quot;;

}

* {
font-family: &quot;Roboto&quot;, Verdana;
}</style>"`,
    )
  })
})
