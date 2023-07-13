import { describe, it, expect } from 'vitest'
import Img from '../Img.vue'
import { h } from 'vue'
import { useRenderClient } from 'src'

describe('render', () => {
  it('renders the <Img> component', () => {
    const component = h(Img, {
      src: 'car.jpg',
      alt: 'Car',
      width: 300,
      height: 200,
    })

    const actualOutput = useRenderClient(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><img data-id=\\"__vue-email-img\\" style=\\"display: block; outline: none; text-decoration: none;\\" src=\\"car.jpg\\" alt=\\"Car\\" width=\\"300\\" height=\\"200\\">"',
    )
  })
})
