import type { CSSProperties } from 'vue'
import { styles } from './styles'
import { patterns } from './patterns'
import type { StylesType } from '../types/markdown'

export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function parseCssInJsToInlineCss(
  cssProperties: CSSProperties | undefined,
): string {
  if (!cssProperties) return ''

  return Object.entries(cssProperties)
    .map(([property, value]) => `${camelToKebabCase(property)}:${value}`)
    .join(';')
}

export function parseMarkdownToVueEmailJSX(
  markdown: string,
  customStyles: StylesType = {},
  withDataAttr = false,
): string {
  if (
    markdown === undefined ||
    markdown === null ||
    markdown === '' ||
    typeof markdown !== 'string'
  ) {
    return ''
  }

  const finalStyles = { ...styles, ...customStyles }
  let vueMailTemplate = ''

  // TODO: find a way to convert md to html without using regex and with the help of render function
  // Handle headings (e.g., # Heading)
  vueMailTemplate = markdown.replace(
    patterns.h1,
    `<h1 style="${parseCssInJsToInlineCss(finalStyles.h1)}"${
      withDataAttr ? ' data-id="vue-email-heading"' : ''
    }>$1</h1>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h2,
    `<h2 style="${parseCssInJsToInlineCss(finalStyles.h2)}"${
      withDataAttr ? ' data-id="vue-email-heading"' : ''
    }>$1</h2>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h3,
    `<h3${
      withDataAttr ? ' data-id="vue-email-heading"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.h3)}">$1</h3>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h4,
    `<h4${
      withDataAttr ? ' data-id="vue-email-heading"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.h4)}">$1</h4>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h5,
    `<h5${
      withDataAttr ? ' data-id="vue-email-heading"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.h5)}">$1</h5>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h6,
    `<h6${
      withDataAttr ? ' data-id="vue-email-heading"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.h6)}">$1</h6>`,
  )

  // Handle Tables from GFM
  vueMailTemplate = vueMailTemplate.replace(patterns.table, (match: string) => {
    const rows = match.trim().split('\n')
    const headers = rows[0]
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim())
    const alignments = rows[1]
      .split('|')
      .slice(1, -1)
      .map((cell) => {
        const align = cell.trim().toLowerCase()

        return align === ':--' ? 'left' : align === '--:' ? 'right' : 'center'
      })
    const body = rows
      .slice(2)
      .map((row) => {
        const cells = row
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim())

        return `<tr style="${parseCssInJsToInlineCss(finalStyles.tr)}">${cells
          .map(
            (cell, index) =>
              `<td  align="${
                alignments[index]
              }" style="${parseCssInJsToInlineCss(
                finalStyles.td,
              )}">${cell}</td>`,
          )
          .join('')}</tr>`
      })
      .join('')

    const table = `<table style="${parseCssInJsToInlineCss(
      finalStyles.table,
    )}"><thead style="${parseCssInJsToInlineCss(
      finalStyles.thead,
    )}"><tr style="${parseCssInJsToInlineCss(finalStyles.tr)}">${headers
      .map(
        (header, index) =>
          `<th align="${alignments[index]}" style="${parseCssInJsToInlineCss(
            finalStyles.th,
          )}">${header}</th>`,
      )
      .join('')}</tr></thead><tbody style="${parseCssInJsToInlineCss(
      finalStyles.tbody,
    )}">${body}</tbody></table>`

    return table
  })

  // Handle paragraphs
  vueMailTemplate = vueMailTemplate.replace(patterns.p, '$&')

  // Handle strikethrough
  vueMailTemplate = vueMailTemplate.replace(
    patterns.strikethrough,
    `<del style="${parseCssInJsToInlineCss(
      finalStyles.strikethrough,
    )}">$1</del>`,
  )

  // Handle bold text (e.g., **bold**)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.bold,
    `<p${
      withDataAttr ? ' data-id="vue-email-text"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.bold)}">$1</p>`,
  )

  // Handle italic text (e.g., *italic*)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.italic,
    `<p${
      withDataAttr ? ' data-id="vue-email-text"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.italic)}">$1</p>`,
  )

  // Handle lists (unordered and ordered)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.li,
    `<li style="${parseCssInJsToInlineCss(finalStyles.li)}">$1</li>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.ul,
    `<ul style="${parseCssInJsToInlineCss(finalStyles.ul)}">$&</ul>`,
  )

  // Handle images (e.g., ![alt text](url))
  vueMailTemplate = vueMailTemplate.replace(
    patterns.image,
    `<img src="$2" alt="$1" style="${parseCssInJsToInlineCss(
      finalStyles.image,
    )}">`,
  )

  // Handle links (e.g., [link text](url))
  vueMailTemplate = vueMailTemplate.replace(
    patterns.link,
    `<a${
      withDataAttr ? ' data-id="vue-email-link"' : ''
    } style="${parseCssInJsToInlineCss(
      finalStyles.link,
    )}"  href="$2" target="_blank" >$1</a>`,
  )

  // Handle code blocks (e.g., ```code```)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.codeBlocks,
    `<pre style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"><p${
      withDataAttr ? ' data-id="vue-email-text"' : ''
    }>${'{`$1`}'}</p></pre>`,
  )

  // Handle inline code (e.g., `code`)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.codeInline,
    `<p${
      withDataAttr ? ' data-id="vue-email-text"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.codeInline)}">$1</p>`,
  )

  // Handle block quotes
  vueMailTemplate = vueMailTemplate.replace(
    /^>\s+(.+)$/gm,
    `<p${
      withDataAttr ? ' data-id="vue-email-text"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}">$1</p>`,
  )

  // Handle line breaks (e.g., <br />)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.br,
    `<br style="${parseCssInJsToInlineCss(finalStyles.br)}" />`,
  )

  // Handle horizontal rules (e.g., ---)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.hr,
    `<hr${
      withDataAttr ? ' data-id="vue-email-hr"' : ''
    } style="${parseCssInJsToInlineCss(finalStyles.hr)}" />`,
  )

  return vueMailTemplate
}
