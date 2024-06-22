import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Section } from "./index";

describe("<Section> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Section, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
