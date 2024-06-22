import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Container } from "./index";

describe("<Container> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Container, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
