import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EBody, useRender } from '../src'

describe('render', () => {
  it('renders the <Body> component', async () => {
    const component = h(EBody, null, {
      default: () => 'Hi there!',
    })
    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><body data-id="__vue-email-body">Hi there!</body>"',
    )
  })
})
