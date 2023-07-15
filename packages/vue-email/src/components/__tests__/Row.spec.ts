import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { useRenderClient } from 'src'
import Row from '../Row.vue'

describe('render', () => {
  it('renders the <Row> component', () => {
    const component = h(Row)

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-row\\" role=\\"presentation\\" cellspacing=\\"0\\" cellpadding=\\"0\\" border=\\"0\\"><tbody style=\\"width: 100%;\\"><tr style=\\"width: 100%;\\"></tr></tbody></table>"',
    )
  })
})
