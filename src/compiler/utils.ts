import * as process from 'node:process'

export function env(name: string): string | null | undefined {
  return process.env[name]
}

export const isProd: boolean = env('NODE_ENV') === 'production'

// const scriptIdentifier = `_sfc_main`

// function convertScriptSetup(descriptor: SFCDescriptor) {
//   const attachedProps: [string, string][] = []
//   const hasScoped = descriptor.styles.some((s) => s.scoped)

//   // Script
//   const scriptCode = genScriptCode(descriptor)
// }

// function convertSFC(path: string): string {
//   const filename = path.split('/')[path.split('/').length - 1]
//   const COMPONENT_START = 'export default defineComponent({'

//   const data = readFile(path)
//   const parsed = $compiler.parse(data, {
//     filename,
//   })

//   parsed.descriptor.id = generateId(filename)

//   if (parsed.descriptor.scriptSetup?.setup) {
//     convertScriptSetup(parsed.descriptor)
//     return
//   }

//   if (!parsed.descriptor) {
//     throw new Error('An error occurred while parsing component')
//   }

//   const { template: t } = parsed.descriptor
//   let template = t?.content

//   if (!template) {
//     template = ''
//   }

//   template = template
//     .replace(/[\n\r]/gi, ' ')
//     .replace(/"/gi, '\\"')
//     .replace(/\s\s+/gi, ' ')

//   const x = parsed.descriptor.styles
//     .map((s) => s.content)
//     .join('\n\n')
//     .replace(/[\n\r]/gi, '')
//     .replace(/"/gi, '\\"')
//     .replace(/\s\s+/gi, '')

//   const b = `\nstyle: "${x}",\n`

//   template = `\ntemplate: "${template}",\n`

//   const s = parsed.descriptor.script
//   let script = s?.content

//   if (!script) {
//     script = ''
//   }

//   const position = script.indexOf(COMPONENT_START) + COMPONENT_START.length
//   let component = script.substring(0, position) + template + script.substring(position)

//   component = component.substring(0, position + template.length) + b + script.substring(position)

//   // component = transpile(component);

//   return component
// }

// async function _templateRender(name: string, options?: RenderOptions, config?: Options): Promise<string> {
//   const component: Component = (await import(`${config?.dir}/.vuemail/${name}`)).default

//   const app = createSSRApp(component, options?.props)
//   const content = await renderToString(app)

//   return cleanup(content)
// }

// function genScriptCode(descriptor: SFCDescriptor): string {
//   let scriptCode = `const ${scriptIdentifier} = {}`

//   const script = resolveScript(descriptor)
//   if (script) {
//     // If the script is js/ts and has no external src, it can be directly placed
//     // in the main module.
//     if (canInlineMain(descriptor)) {
//       if (!$compiler.version) {
//         // if compiler-sfc exposes no version, it's < 3.3 and doesn't support
//         // genDefaultAs option.
//         const userPlugins = []
//         const defaultPlugins = script.lang === 'ts' ? (userPlugins.includes('decorators') ? (['typescript'] as const) : (['typescript', 'decorators-legacy'] as const)) : []
//         scriptCode = $compiler.rewriteDefault(script.content, scriptIdentifier, [...defaultPlugins, ...userPlugins])
//       } else {
//         scriptCode = script.content
//       }
//     } else {
//       const src = script.src || descriptor.filename
//       const langFallback = (script.src && path.extname(src).slice(1)) || 'js'
//       const attrsQuery = attrsToQuery(script.attrs, langFallback)
//       const srcQuery = script.src ? `&src=true` : ``
//       const query = `?vue&type=script${srcQuery}${attrsQuery}`
//       const request = JSON.stringify(src + query)
//       scriptCode = `import _sfc_main from ${request}\n` + `export * from ${request}` // support named exports
//     }
//   }

//   return scriptCode
// }

// function resolveScript(descriptor: SFCDescriptor): SFCScriptBlock | null {
//   if (!descriptor.script && !descriptor.scriptSetup) {
//     return null
//   }

//   let resolved: SFCScriptBlock | null = null

//   resolved = $compiler.compileScript(descriptor, {
//     id: descriptor.id,
//     isProd,
//     inlineTemplate: isUseInlineTemplate(descriptor, process.env.NODE_ENV === 'production'),
//     templateOptions: {
//       ...descriptor,
//     },
//     sourceMap: false,
//     genDefaultAs: canInlineMain(descriptor) ? scriptIdentifier : undefined,
//   })

//   return resolved
// }

// function isUseInlineTemplate(descriptor: SFCDescriptor, isProd: boolean): boolean {
//   return isProd && !!descriptor.scriptSetup && !descriptor.template?.src
// }

// function generateId(text: string) {
//   return createHash('sha256').update(text).digest('hex').substring(0, 8)
// }

// // If the script is js/ts and has no external src, it can be directly placed
// // in the main module. Skip for build
// export function canInlineMain(descriptor: SFCDescriptor): boolean {
//   if (descriptor.script?.src || descriptor.scriptSetup?.src) {
//     return false
//   }
//   const lang = descriptor.script?.lang || descriptor.scriptSetup?.lang
//   if (!lang) {
//     return true
//   }
//   if (lang === 'ts') {
//     return true
//   }
//   return false
// }

// // these are built-in query parameters so should be ignored
// // if the user happen to add them as attrs
// const ignoreList = ['id', 'index', 'src', 'type', 'lang', 'module', 'scoped', 'generic']

// function attrsToQuery(attrs: $compiler.SFCBlock['attrs'], langFallback?: string, forceLangFallback = false): string {
//   let query = ``
//   for (const name in attrs) {
//     const value = attrs[name]
//     if (!ignoreList.includes(name)) {
//       query += `&${encodeURIComponent(name)}${value ? `=${encodeURIComponent(value)}` : ``}`
//     }
//   }
//   if (langFallback || attrs.lang) {
//     query += `lang` in attrs ? (forceLangFallback ? `&lang.${langFallback}` : `&lang.${attrs.lang}`) : `&lang.${langFallback}`
//   }
//   return query
// }
