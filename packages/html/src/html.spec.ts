import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Html } from "./index";

describe("<Html> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Html, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
