import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Head } from "./index";

describe("<Head> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Head, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
