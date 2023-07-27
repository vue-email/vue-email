import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
	meta: {
		name: 'vue-email',
		configKey: 'VueEmail',
		compatibility: {
			nuxt: '^3.0.0',
		},
	},
	defaults: {},
	setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url)

		// Add templates (options and directives)
		addPlugin(resolve('./runtime/templates/vue-email.ts'))

		// Add auto imports
		addImportsDir(resolve('./runtime/composables'))
	},
})
