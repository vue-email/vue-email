import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Link } from "./index";

describe("<Link> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Link, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
