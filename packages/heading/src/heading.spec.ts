import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Heading } from "./index";

describe("<Heading> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Heading, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
