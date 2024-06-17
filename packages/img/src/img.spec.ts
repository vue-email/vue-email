import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Img } from "./index";

describe("<Img> component", () => {
  it("passes style and other props correctly", async () => {
    const style = { backgroundColor: "red", border: "solid 1px black" };

    const component = h(Img, {
      alt: "Cat",
      "data-testid": "img-test",
      height: 300,
      width: 300,
      style,
      src: "cat.jpg"
    })
    const html = await render(component)

    expect(html).toContain("background-color:red");
    expect(html).toContain("border:solid 1px black");
    expect(html).toContain('data-testid="img-test"');
  });
})
