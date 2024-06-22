import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Font } from "./index";

describe("<Font> component", () => {
  it("renders with default props", async () => {

    const component = h(Font, {
      fallbackFontFamily: 'Helvetica',
      fontFamily: 'Arial',
    })

    const html = await render(component)

    expect(html).toContain("font-style: normal;");
    expect(html).toContain("font-weight: 400;");
    expect(html).toContain("font-family: 'Arial';");
  });
})
