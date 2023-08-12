import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EHead, useRender } from '../src'

describe('render', () => {
  it('renders the <Head> component', async () => {
    const component = h(EHead)

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><head><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"></head>"',
    )
  })

  it('renders the <Container> component with title', async () => {
    const component = h(EHead, undefined, {
      default: () => h('title', 'My email title'),
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><head><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"><title>My email title</title></head>"',
    )
  })
})
