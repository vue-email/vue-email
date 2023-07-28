import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ERow, useRender } from 'src'

describe('render', () => {
  it('renders the <Row> component', async () => {
    const component = h(ERow)

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-row\\" role=\\"presentation\\" cellspacing=\\"0\\" cellpadding=\\"0\\" border=\\"0\\"><tbody style=\\"width:100%;\\"><tr style=\\"width:100%;\\"></tr></tbody></table>"',
    )
  })
})
