import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Button } from "./index";

describe("<Button> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Button, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
