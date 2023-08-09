import * as _path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as compiler from 'vue/compiler-sfc'
import type { Component } from 'vue'
import { createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createDescriptor } from './descriptor'
import { isProd } from './utils'
import { readFile, writeFile } from './file'

import type { Options, RenderOptions } from './types'

const scriptIdentifier = '_sfc_main'

const root = _path.dirname(fileURLToPath(import.meta.url))

export function compileTemplate(path: string, config: Options): void {
  const $path = _path.normalize(path)
  const component = compile($path)
  // const normalizedDir = _path.normalize(config?.input?.templates?.dir ?? '')
  const name = path.split('/')[path.split('/').length - 1]
  const finalPath = _path.normalize(`${config?.output?.dir}/${name.replace('.vue', '.js')}`)

  writeFile(finalPath, component.trim())
}

export async function templateRender(name: string, options?: RenderOptions, config?: Options): Promise<string> {
  const component: Component = (await import(`${config?.dir}/.vuemail/${name}.js`)).default

  const app = createApp(component, options?.props)
  const content = await renderToString(app)

  return content
}

function compile(path: string) {
  const source = readFile(path)
  const splittedPath = path.split('/')
  const filename = splittedPath[splittedPath.length - 1]
  let styles: compiler.SFCStyleCompileResults | null = null

  const { descriptor, errors } = createDescriptor(filename, source, {
    compiler,
    root,
    isProd,
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
