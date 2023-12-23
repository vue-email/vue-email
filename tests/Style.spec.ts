import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EHead, EStyle, useRender } from '../src'

describe('render', () => {
  it('renders the <Style> component', async () => {
    const component = h(EStyle, `.pager.inactive {display: none;}`)

    const actualOutput = await useRender(component)

    expect(actualOutput.html).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><style data-id="__vue-email-style">.pager.inactive {display: none;}</style>"',
    )
  })

  it('renders the <Head> with <Style> component with title', async () => {
    const component = h(EHead, undefined, {
      default: () => h(EStyle, `.pager.inactive {display: none;}`),
    })

    const actualOutput = await useRender(component)

    expect(actualOutput.html).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style data-id="__vue-email-style">.pager.inactive {display: none;}</style></head>"',
    )
  })
})
