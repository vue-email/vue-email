import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Hr } from "./index";

describe("<Hr> component", () => {
  it("passes styles and other props correctly", async () => {
    const component = h(Hr, {
      'data-testid': "hr-test",
      style: {
        width: "50%",
        borderColor: "black",
      }
    })
    const html = await render(component)
    expect(html).toContain("width:50%");
    expect(html).toContain("border-color:black");
    expect(html).toContain('data-testid="hr-test"');
  });
})
