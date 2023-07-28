import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EColumn, useRender } from 'src'

describe('render', () => {
	it('renders the <Column> component', async () => {
		const component = h(EColumn, null, {
			default: () => 'Lorem ipsum',
		})

		const actualOutput = await useRender(component)

		expect(actualOutput).toMatchInlineSnapshot(
			'"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><td data-id=\\"__vue-email-column\\" role=\\"presentation\\">Lorem ipsum</td>"',
		)
	})
})
