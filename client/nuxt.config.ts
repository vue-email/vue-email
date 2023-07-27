import { resolve } from 'node:path'

export default defineNuxtConfig({
	ssr: false,
	modules: ['@nuxt/devtools-ui-kit'],
	experimental: {
		reactivityTransform: true,
	},
	nitro: {
		output: {
			publicDir: resolve(__dirname, '../dist/client'),
		},
	},
	app: {
		baseURL: '/__vue_email__/client',
	},
	vite: {
		// fixes shiki bug
		define: {
			'process.env.VSCODE_TEXTMATE_DEBUG': 'false',
		},
		build: {
			target: 'esnext',
		},
	},
})
