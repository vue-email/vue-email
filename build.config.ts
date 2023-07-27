import { defineBuildConfig } from 'unbuild'
import vue from '@vitejs/plugin-vue'

export default defineBuildConfig({
	rollup: {
		emitCJS: true,
	},
	declaration: true,
	entries: [
		// Plugin
		{
			input: 'src/index.ts',
			outDir: 'dist',
			name: 'index',
			format: 'esm',
			ext: 'mjs',
		},
		{
			input: 'src/index.ts',
			outDir: 'dist',
			name: 'index',
			format: 'cjs',
			ext: 'cjs',
		},
		// Nuxt
		{
			input: 'src/nuxt/module.ts',
			outDir: 'dist',
			name: 'nuxt',
			format: 'esm',
			ext: 'mjs',
		},
		{
			input: 'src/nuxt/module.ts',
			outDir: 'dist',
			name: 'nuxt',
			format: 'cjs',
			ext: 'cjs',
		},
		// Copy runtime folder with mkdist
		{
			builder: 'mkdist',
			input: 'src/nuxt/runtime',
			outDir: 'dist/runtime',
			declaration: false,
		},
	],
	externals: ['html-to-text', 'pretty', 'isomorphic-dompurify'],
	dependencies: [],
	hooks: {
		'rollup:options': (_ctx, options) => {
			if (Array.isArray(options.plugins)) {
				options.plugins.push(vue())
			}
		},
	},
})
