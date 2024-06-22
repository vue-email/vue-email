import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Column } from "./index";

describe("<Column> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Column, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
