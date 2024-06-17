import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Style } from "./index";

describe("<Style> component", () => {
  it("renders children correctly", async () => {
    const component = h(Style, `.pager.inactive {display: none;}`)
    const html = await render(component)
    expect(html).toMatchInlineSnapshot('"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><style data-id="__vue-email-style">.pager.inactive {display: none;}</style>"')
  });
})
