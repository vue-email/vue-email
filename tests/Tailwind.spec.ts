import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ETailwind, useRender } from 'src'

describe('Tailwind component', () => {
	describe('Inline styles', () => {
		it('should render children with inline Tailwind styles', async () => {
			const component = h(ETailwind, undefined, {
				default: () =>
					h('div', {
						class: 'bg-black text-white',
					}),
			})

			const actualOutput = await useRender(component)

			expect(actualOutput).toMatchInlineSnapshot(
				'"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div><div style=\\"background-color:rgb(0,0,0);color:rgb(255,255,255)\\"></div></div>"',
			)
		})

		// TODO: add more tests
	})
})
