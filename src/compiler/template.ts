import * as compiler from 'vue/compiler-sfc'
import { createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { blue, bold, lightGreen } from 'kolorist'
import { importFromStringSync } from 'module-from-string'
import type { Component } from 'vue'
import type { Options, RenderOptions } from '../types/compiler'
import { VueEmailPlugin } from 'vue-email'

const scriptIdentifier = '_sfc_main'

export async function templateRender(name: string, source: string, options?: RenderOptions, config?: Options): Promise<string> {
  const output = compile(name, source, config?.verbose)
  const component: Component = importFromStringSync(output, {
    transformOptions: { loader: 'ts' },
  }).default

  if (config?.verbose) {
    console.warn(`${lightGreen('💌')} ${bold(blue('Generating output'))}`)
  }

  const app = createApp(component, options?.props)
  app.use(VueEmailPlugin, config?.options)
  const markup = await renderToString(app)
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const doc = `${doctype}${replaceString(markup)}`

  if (config?.verbose) {
    console.warn(`${lightGreen('🎉')} ${bold(blue('Rendering template'))} ${bold(lightGreen(name))}`)
  }

  return doc
}

function compile(filename: string, source: string, verbose = false) {
  let styles: compiler.SFCStyleCompileResults | null = null

  if (verbose) {
    console.warn(`${lightGreen('🚧')} ${bold(blue('Compiling'))} ${bold(lightGreen(filename))} ${bold(blue('file'))}`)
  }

  const { descriptor, errors } = compiler.parse(source, {
    filename,
  })

  if (errors.length) {
    throw new Error(errors.join('\n'))
  }

  const script = compiler.compileScript(descriptor, {
    id: descriptor.filename,
    genDefaultAs: scriptIdentifier,
  })

  if (descriptor.styles.length) {
    styles = compiler.compileStyle({
      id: descriptor.filename,
      filename,
      source: descriptor.styles[0].content,
      scoped: descriptor.styles.some((s) => s.scoped),
    })
  }

  const template = compiler.compileTemplate({
    filename,
    id: descriptor.filename,
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

function replaceString(str: string) {
  if (!str || typeof str !== 'string') return str

  return str
    .replace(/ data-v-inspector="[^"]*"/g, '')
    .replace(/<!--\[-->/g, '')
    .replace(/<!--]-->/g, '')
    .replace(/<template>/g, '')
    .replace(/<\/template>/g, '')
}
