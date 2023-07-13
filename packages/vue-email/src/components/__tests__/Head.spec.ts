import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Head from '../Head.vue'
import { h } from 'vue'
import { useRenderClient } from 'src'

describe('render', () => {
  it('renders the <Head> component', () => {
    const component = h(Head)

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><head><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"></head>"',
    )
  })

  it('renders the <Container> component with title', () => {
    const component = h(Head, undefined, {
      default: () => h('title', 'My email title'),
    })

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><head><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"><title>My email title</title></head>"',
    )
  })
})
