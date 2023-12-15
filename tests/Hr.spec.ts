import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EHr, useRender } from '../src'

describe('render', () => {
  it('renders the <Hr> component', async () => {
    const component = h(EHr)

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><hr data-id="__vue-email-hr" style="width: 100%; border: none; border-top: 1px solid #eaeaea;">"',
    )
  })
})
