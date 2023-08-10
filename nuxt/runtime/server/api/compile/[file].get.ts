import type { Component } from 'vue'
import { createSSRApp } from 'vue'
import type { SFCStyleCompileResults } from 'vue/compiler-sfc'
import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'
import { renderToString } from 'vue/server-renderer'
import { importFromStringSync } from 'module-from-string'
import { VueEmailPlugin } from 'vue-email'

const scriptIdentifier = '_sfc_main'

export default defineEventHandler(async (event) => {
  try {
    const file = event.context.params && event.context.params.file ? event.context.params.file : null

    const template = await useStorage('assets:emails').getItem(`${file}`)
    console.log(template)

    const { descriptor } = parse(template)

    const script = compileScript(descriptor, {
      id: descriptor.filename,
      genDefaultAs: scriptIdentifier,
    })

    let styles: SFCStyleCompileResults | null = null

    if (descriptor.styles.length) {
      styles = compileStyle({
        id: descriptor.filename,
        filename: descriptor.filename,
        source: descriptor.styles[0].content,
        scoped: descriptor.styles.some((s) => s.scoped),
      })
    }

    const comipledTemplate = compileTemplate({
      filename: descriptor.filename,
      id: descriptor.filename,
      source: descriptor.template!.content,
      compilerOptions: {
        bindingMetadata: script.bindings,
      },
    })

    const output = `
    ${comipledTemplate.code}\n
    ${script.content}
  
    ${styles ? `const styles = \`${styles.code}\`` : ''}
  
    ${scriptIdentifier}.render = render
    ${styles ? `${scriptIdentifier}.style = styles` : ''}
    export default _sfc_main
    `

    const component: Component = importFromStringSync(output, {
      transformOptions: { loader: 'ts' },
    }).default

    const app = createSSRApp(component, {
      teamName: 'Test Team',
    })

    app.use(VueEmailPlugin, {
      baseUrl: 'https://vue-email-demo.vercel.app/',
    })

    const html = await renderToString(app)

    return html
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
