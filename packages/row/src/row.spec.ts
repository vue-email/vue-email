import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Row } from "./index";

describe("<Row> component", () => {
  it("renders children correctly", async () => {
    const testMessage = "Test message";
    const component = h(Row, [
      testMessage
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  });
})
