import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EImg, useRender } from 'src'

describe('render', () => {
	it('renders the <Img> component', async () => {
		const component = h(EImg, {
			src: 'car.jpg',
			alt: 'Car',
			width: 300,
			height: 200,
		})

		const actualOutput = await useRender(component)

		expect(actualOutput).toMatchInlineSnapshot(
			'"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><img data-id=\\"__vue-email-img\\" style=\\"display:block;outline:none;border:none;text-decoration:none;\\" src=\\"car.jpg\\" alt=\\"Car\\" width=\\"300\\" height=\\"200\\">"',
		)
	})
})
