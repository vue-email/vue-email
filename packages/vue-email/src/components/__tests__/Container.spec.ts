import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Container from '../Container.vue'
import { h } from 'vue'
import { useRender } from 'src'

describe('render', () => {
  const innerText = 'Lorem ipsum'

  it('renders the <Container> component', () => {
    const component = h(
      Container,
      {
        style: {
          maxWidth: '300px',
        },
      },
      {
        default: () => innerText,
      },
    )

    const actualOutput = useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-container\\" role=\\"presentation\\" cellspacing=\\"0\\" cellpadding=\\"0\\" border=\\"0\\" style=\\"max-width: 300px;\\"><tbody><tr style=\\"width: 100%;\\"><td>${innerText}</td></tr></tbody></table>"`,
    )
  })
})
