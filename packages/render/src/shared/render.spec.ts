import Template from "./utils/template.vue";
import { render } from "./render";
import { describe, expect, it } from 'vitest'
import { h } from "vue";

describe("render", () => {
  it("converts a Vue component into HTML", async () => {

    const actualOutput = await render(h(Template, { firstName: "Jim" }))

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><h1>Welcome, Jim!</h1><img alt="test" src="/@fs/img/test.png"><p>Thanks for trying our product. We&#39;re thrilled to have you on board!</p>"',
    );

  })
});
