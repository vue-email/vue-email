import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Body } from "./index";

describe('<Body> component', () => {
  it('renders children correctly', async () => {
    const testMessage = "Test message";
    const component = h(Body, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
