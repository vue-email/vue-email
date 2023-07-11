import fs from 'fs'
import { resolve } from 'path'
const cleanCSS = new (require('clean-css'))()

const fileRegex = /\.(css|postcss)$/

const injectCode = (code) =>
  `function styleInject(css,ref){if(ref===void 0){ref={}}var insertAt=ref.insertAt;if(!css||typeof document==="undefined"){return}var head=document.head||document.getElementsByTagName("head")[0];var style=document.createElement("style");style.type="text/css";if(insertAt==="top"){if(head.firstChild){head.insertBefore(style,head.firstChild)}else{head.appendChild(style)}}else{head.appendChild(style)}if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}};styleInject(\`${code}\`)`
const template = 'console.warn("__INJECT__")'

let viteConfig
const css = []

export default function libInjectCss() {
  return {
    name: 'lib-inject-css',

    apply: 'build',

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },

    transform(code, id) {
      if (fileRegex.test(id)) {
        css.push(cleanCSS.minify(code).styles)

        return {
          code: '',
        }
      }
      if (id.includes(viteConfig.build.lib.entry)) {
        return {
          code: `${code}
          ${template}`,
        }
      }

      return null
    },

    async writeBundle(_, bundle) {
      for (const file of Object.entries(bundle)) {
        const { root } = viteConfig
        const outDir = viteConfig.build.outDir || 'dist'
        const [fileName] = file
        const filePath = resolve(root, outDir, fileName)

        try {
          let data = fs.readFileSync(filePath, {
            encoding: 'utf8',
          })

          if (data.includes(template)) {
            data = data.replace(template, injectCode(css.join('')))
          }

          fs.writeFileSync(filePath, data)
        } catch (e) {
          console.error(e)
        }
      }
    },
  }
}
