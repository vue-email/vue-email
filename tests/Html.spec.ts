import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EHtml, useRender } from '../src'

describe('render', () => {
  it('renders the <Html> component', async () => {
    const component = h(EHtml)

    const actualOutput = await useRender(component)

    expect(actualOutput.html).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html id="__vue-email" lang="en" dir="ltr"></html>"',
    )
  })
})
