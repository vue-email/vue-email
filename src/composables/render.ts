import { convert } from 'html-to-text'
import pretty from 'pretty'
import { type Component, createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

export interface Options {
	pretty?: boolean
	plainText?: boolean
}

// TODO: Used only in tests, find a way to merge this with useRender later
export function useRenderClient(component: Component, props?: any) {
	const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	const app = createApp({ render: () => h(component) }, props)
	const mounted = app.mount(document.createElement('div'))

	const markup = mounted.$el.outerHTML
	const doc = `${doctype}${markup}`

	return doc
}

/**
 * Convert Vue file into HTML email template
 * @param component The main component to render
 * @param props The props passed to the component
 * @param {Options} options The options to convert the template
 * @returns {string}
 */
export async function useRender(
	component: Component,
	props?: any,
	options: Options = {
		pretty: false,
		plainText: false,
	},
) {
	if (options.plainText) {
		return renderAsText(component)
	}

	const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	const app = createApp({ render: () => h(component) }, props)
	const markup = await renderToString(app)
	const doc = `${doctype}${replaceString(markup)}`

	if (options.pretty) {
		return pretty(doc)
	}

	return doc
}

async function renderAsText(component: Component) {
	const markup = await renderToString(h(component))

	return convert(markup, {
		selectors: [
			{ selector: 'img', format: 'skip' },
			{ selector: '#__vue-email-preview', format: 'skip' },
		],
	})
}

function replaceString(str: string) {
	if (!str || typeof str !== 'string') return str

	return str
		.replace(/ data-v-inspector="[^"]*"/g, '')
		.replace(/<!--\[-->/g, '')
		.replace(/<!--]-->/g, '')
}
