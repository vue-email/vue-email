import fs from 'node:fs'
import { resolve } from 'pathe'
import * as compiler from 'vue/compiler-sfc'
import { createApp } from 'vue'
import type { Component } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { importFromStringSync } from 'module-from-string'

import { VueEmailPlugin } from 'vue-email'
import { createDescriptor } from './descriptor'

import type { Options, RenderOptions } from './types'

const scriptIdentifier = '_sfc_main'

const root = resolve(__dirname)

export async function templateRender(name: string, options?: RenderOptions, config?: Options): Promise<string> {
  const output = compile(`${config?.dir}/${name}`)
  const component: Component = importFromStringSync(output, {
    transformOptions: { loader: 'ts' },
  }).default

  console.warn(`Generating ${name}`)

  const app = createApp(component, options?.props)
  app.use(VueEmailPlugin)
  const content = await renderToString(app)

  console.warn(`Rendering ${name} template`)

  return content
}

function compile(path: string) {
  const source = readFile(path)
  const splittedPath = path.split('/')
  const filename = splittedPath[splittedPath.length - 1]
  let styles: compiler.SFCStyleCompileResults | null = null

  console.warn(`Compiling ${filename} file`)

  const { descriptor, errors } = createDescriptor(filename, source, {
    compiler,
    root,
    isProd: import.meta.env.PROD,
  })

  if (errors.length) {
    throw new Error(errors.join('\n'))
  }

  const script = compiler.compileScript(descriptor, {
    id: descriptor.id,
    genDefaultAs: scriptIdentifier,
  })

  if (descriptor.styles.length) {
    styles = compiler.compileStyle({
      id: `data-v-${descriptor.id}`,
      filename,
      source: descriptor.styles[0].content,
      scoped: descriptor.styles.some((s) => s.scoped),
    })
  }

  const template = compiler.compileTemplate({
    filename,
    id: descriptor.id,
    source: descriptor.template!.content,
    compilerOptions: {
      bindingMetadata: script.bindings,
    },
  })

  const output = `
  ${template.code}\n
  ${script.content}
  ${styles ? `const styles = \`${styles.code}\`` : ''}
  ${scriptIdentifier}.render = render
  ${styles ? `${scriptIdentifier}.style = styles` : ''}
  export default _sfc_main
  `

  return output
}

/**
 * Returns the content of a file at path.
 *
 * @param path
 */
function readFile(path: string): string {
  return fs.readFileSync(path, 'utf-8').toString()
}
