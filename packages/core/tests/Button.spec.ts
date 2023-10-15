import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EButton, useRender } from '../src'

describe('render', () => {
  it('renders the <Button> component', async () => {
    const component = h(EButton, {
      px: '20',
      py: '12',
      href: 'https://example.com',
    })
    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a data-id=\\"__vue-email-button\\" style=\\"line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;\\" href=\\"https://example.com\\" target=\\"_blank\\"><span><!--[if mso]><i style=\\"letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18\\" hidden>&nbsp;</i><![endif]--></span><span style=\\"max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:9;\\"></span><span><!--[if mso]><i style=\\"letter-spacing: 20px;mso-font-width:-100%\\" hidden>&nbsp;</i><![endif]--></span></a>"',
    )
  })

  it('renders the <Button> component with no padding value', async () => {
    const component = h(EButton, {
      href: 'https://example.com',
    })
    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a data-id=\\"__vue-email-button\\" style=\\"line-height:100%;text-decoration:none;display:inline-block;max-width:100%;\\" href=\\"https://example.com\\" target=\\"_blank\\"><span><!--[if mso]><i style=\\"letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0\\" hidden>&nbsp;</i><![endif]--></span><span style=\\"max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0;\\"></span><span><!--[if mso]><i style=\\"letter-spacing: 0px;mso-font-width:-100%\\" hidden>&nbsp;</i><![endif]--></span></a>"',
    )
  })
})
