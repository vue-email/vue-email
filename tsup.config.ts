import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/nuxt/module.ts', 'src/compiler/index.ts'],
  clean: true,
  format: 'esm',
  dts: true,
  bundle: true,
  target: 'esnext',
  platform: 'node',
  banner: {
    js: `
    import path from 'path';
    import { fileURLToPath } from 'url';
    import { createRequire as topLevelCreateRequire } from 'module';
    const require = topLevelCreateRequire(import.meta.url);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    `,
  },
})
