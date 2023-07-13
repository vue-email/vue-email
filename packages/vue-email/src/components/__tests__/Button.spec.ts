import { describe, it, expect } from 'vitest'
import Button from '../Button.vue'
import { useRenderClient } from 'src'
import { h } from 'vue'

describe('render', () => {
  it('renders the <Button> component', () => {
    const component = h(Button, {
      px: '20',
      py: '12',
      href: 'https://example.com',
    })
    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a data-id=\\"__vue-email-button\\" style=\\"line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 12px 20px;\\" href=\\"https://example.com\\" target=\\"_blank\\"><span><!--[if mso]><i style=\\"letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18\\" hidden>&nbsp;</i><![endif]--></span><span style=\\"max-width: 100%; display: inline-block; line-height: 120%; text-decoration: none; text-transform: none;\\"></span><span><!--[if mso]><i style=\\"letter-spacing: 20px;mso-font-width:-100%\\" hidden>&nbsp;</i><![endif]--></span></a>"
    `,
    )
  })

  it('renders the <Button> component with no padding value', async () => {
    const component = h(Button, {
      href: 'https://example.com',
    })
    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(`
    "<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a data-id=\\"__vue-email-button\\" style=\\"line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 0px 0px;\\" href=\\"https://example.com\\" target=\\"_blank\\"><span><!--[if mso]><i style=\\"letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0\\" hidden>&nbsp;</i><![endif]--></span><span style=\\"max-width: 100%; display: inline-block; line-height: 120%; text-decoration: none; text-transform: none;\\"></span><span><!--[if mso]><i style=\\"letter-spacing: 0px;mso-font-width:-100%\\" hidden>&nbsp;</i><![endif]--></span></a>"
    `)
  })
})
