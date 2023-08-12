import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EContainer, useRender } from '../src'

describe('render', () => {
  it('renders the <Container> component', async () => {
    const component = h(
      EContainer,
      {
        style: {
          maxWidth: '300px',
        },
      },
      {
        default: () => 'Lorem ipsum',
      },
    )

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-container\\" role=\\"presentation\\" cellspacing=\\"0\\" cellpadding=\\"0\\" border=\\"0\\" style=\\"max-width:37.5em;max-width:300px;\\"><tbody><tr style=\\"width: 100%\\"><td>Lorem ipsum</td></tr></tbody></table>"'
    )
  })
})
