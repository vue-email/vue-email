/// <reference types="vitest" />
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'

export default defineConfig({
	root: __dirname,
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
		}),
	],
	test: {
		environment: 'happy-dom',
		include: ['./tests/**/*.spec.ts'],
	},
	build: {
		watch: {
			include: ['src/**'],
		},
		rollupOptions: {
			plugins: [
				copy({
					targets: [{ src: 'src/nuxt/runtime', dest: 'dist/' }],
				}),
			],
			external: ['nuxt3', 'nuxt', 'vue', '@nuxt/kit', 'html-to-text', 'pretty', 'isomorphic-dompurify'],
			output: [
				{
					format: 'esm',
					dir: 'dist',
					entryFileNames: '[name].mjs',
					chunkFileNames: '[name].mjs',
					exports: 'named',
					globals: {
						vue: 'Vue',
					},
				},
				{
					format: 'cjs',
					dir: 'dist',
					entryFileNames: '[name].cjs',
					chunkFileNames: '[name].cjs',
					exports: 'named',
					globals: {
						vue: 'Vue',
					},
				},
			],
			input: {
				index: 'src/index.ts',
				nuxt: 'src/nuxt/module.ts',
			},
		},
	},
})
