import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EFont, useRender } from '../src'

const stringSnapshotSerializer = {
  serialize(val) {
    return val
  },
  test(val) {
    return (typeof val == 'string')
  },
}
expect.addSnapshotSerializer(stringSnapshotSerializer)

describe('render', () => {
  it('renders the <Font> component', async () => {
    const component = h(EFont, {
      fontFamily: 'Roboto',
      fallbackFontFamily: 'Verdana',
    })

    const actualOutput = await useRender(component)

    const html = actualOutput.html.replace(/\s+/g, ' ')

    expect(html).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><style> @font-face { font-family: 'Roboto'; font-style: normal; font-weight: 400; mso-font-alt: 'Verdana'; } * { font-family: 'Roboto', Verdana; } </style>`,
    )
  })
})
