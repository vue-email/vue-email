import type { CSSProperties } from 'vue'
import DOMPurify from 'isomorphic-dompurify'
import { styles } from './styles'
import { patterns } from './patterns'
import type { StylesType } from '../types/markdown'

// hook to handle target="_blank" in all links
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
  }
})

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
  withDataAttr = true,
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

  // Handle inline code (e.g., `code`)
  vueMailTemplate = markdown.replace(
    patterns.codeInline,
    `<code${
      parseCssInJsToInlineCss(finalStyles.codeInline) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"`
        : ''
    }>$2</code>`,
  )

  // Handle code blocks (e.g., ```code```)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.codeBlocks,
    (_, codeContent: string) => {
      const indentedCodeContent = codeContent
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n')

      return `<pre${
        parseCssInJsToInlineCss(finalStyles.codeBlock) !== ''
          ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"`
          : ''
      }>\n${indentedCodeContent}\n</pre>`
    },
  )

  // Handle blockquotes
  function parseMarkdownWithBlockQuotes(markdown: string): string {
    const blockquoteRegex = /^(>\s*((?:.+\n?)+))(?!\n(?=>\s))/gm

    function parseBlockQuote(match: string) {
      const nestedContent = match.replace(/^>\s*/gm, '')
      const nestedHTML = parseMarkdownWithBlockQuotes(nestedContent)

      return `<blockquote${
        parseCssInJsToInlineCss(finalStyles.blockQuote) !== ''
          ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"`
          : ''
      }>\n${nestedHTML}\n</blockquote>`
    }

    return markdown.replace(blockquoteRegex, parseBlockQuote)
  }

  vueMailTemplate = parseMarkdownWithBlockQuotes(vueMailTemplate)

  // Handle paragraphs
  vueMailTemplate = vueMailTemplate.replace(
    patterns.p,
    `<p${
      parseCssInJsToInlineCss(finalStyles.p) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-text"' : ''}>$1</p>`,
  )

  // Handle headings (e.g., # Heading)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h1,
    `<h1${
      parseCssInJsToInlineCss(finalStyles.h1) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h1)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-heading"' : ''}>$1</h1>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h2,
    `<h2${
      parseCssInJsToInlineCss(finalStyles.h2) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h2)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-heading"' : ''}>$1</h2>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h3,
    `<h3${
      parseCssInJsToInlineCss(finalStyles.h3) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h3)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-heading"' : ''}>$1</h3>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h4,
    `<h4${
      parseCssInJsToInlineCss(finalStyles.h4) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h4)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-heading"' : ''}>$1</h4>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h5,
    `<h5${
      parseCssInJsToInlineCss(finalStyles.h5) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h5)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-heading"' : ''}>$1</h5>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.h6,
    `<h6${
      parseCssInJsToInlineCss(finalStyles.h6) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.h6)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-heading"' : ''}>$1</h6>`,
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

        return `<tr${
          parseCssInJsToInlineCss(finalStyles.tr) !== ''
            ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
            : ''
        }>${cells
          .map(
            (cell, index) =>
              `<td  align="${alignments[index]}"${
                parseCssInJsToInlineCss(finalStyles.td) !== ''
                  ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
                  : ''
              }>${cell}</td>`,
          )
          .join('')}</tr>`
      })
      .join('')

    const table = `<table${
      parseCssInJsToInlineCss(finalStyles.table) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.table)}"`
        : ''
    }><thead${
      parseCssInJsToInlineCss(finalStyles.thead) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.thead)}"`
        : ''
    }><tr${
      parseCssInJsToInlineCss(finalStyles.tr) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
        : ''
    }>${headers
      .map(
        (header, index) =>
          `<th align="${alignments[index]}"${
            parseCssInJsToInlineCss(finalStyles.th) !== ''
              ? ` style="${parseCssInJsToInlineCss(finalStyles.th)}"`
              : ''
          }>${header}</th>`,
      )
      .join('')}</tr></thead><tbody${
      parseCssInJsToInlineCss(finalStyles.tbody) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.tbody)}"`
        : ''
    }>${body}</tbody></table>`

    return table
  })

  // Handle strikethrough
  vueMailTemplate = vueMailTemplate.replace(
    patterns.strikethrough,
    `<del${
      parseCssInJsToInlineCss(finalStyles.strikethrough) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"`
        : ''
    }>$1</del>`,
  )

  // Handle bold text (e.g., **bold**)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.bold,
    `<strong${
      parseCssInJsToInlineCss(finalStyles.bold) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-text"' : ''}>$1</strong>`,
  )

  // Handle italic text (e.g., *italic*)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.italic,
    `<em${
      parseCssInJsToInlineCss(finalStyles.italic) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"`
        : ''
    }${withDataAttr ? ' data-id="vue-email-text"' : ''}>$2</em>`,
  )

  // Handle lists (unordered)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.li,
    `<li${
      parseCssInJsToInlineCss(finalStyles.li) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
        : ''
    }>$1</li>`,
  )
  vueMailTemplate = vueMailTemplate.replace(
    patterns.ul,
    `<ul${
      parseCssInJsToInlineCss(finalStyles.ul) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.ul)}"`
        : ''
    }>$&</ul>`,
  )

  // Handle lists (ordered)
  vueMailTemplate = vueMailTemplate.replace(patterns.ol, (match) => {
    const listItems = match
      .split('\n')
      .map((line) => {
        const listItemContent = line.replace(/^\d+\.\s+/, '')

        return listItemContent
          ? `<li${
            parseCssInJsToInlineCss(finalStyles.li) !== ''
              ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
              : ''
          }>${listItemContent}</li>`
          : ''
      })
      .join('\n')

    return `<ol${
      parseCssInJsToInlineCss(finalStyles.ol) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.ol)}"`
        : ''
    }>${listItems}</ol>`
  })

  // Handle images (e.g., ![alt text](url))
  vueMailTemplate = vueMailTemplate.replace(
    patterns.image,
    `<img src="$2" alt="$1"${
      parseCssInJsToInlineCss(finalStyles.image) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"`
        : ''
    }>`,
  )

  // Handle links (e.g., [link text](url))
  vueMailTemplate = vueMailTemplate.replace(
    patterns.link,
    `<a${withDataAttr ? ' data-id="vue-email-link"' : ''}${
      parseCssInJsToInlineCss(finalStyles.link) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"`
        : ''
    } href="$2" target="_blank" >$1</a>`,
  )

  // Handle line breaks (e.g., <br />)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.br,
    `<br${
      parseCssInJsToInlineCss(finalStyles.br) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"`
        : ''
    }/>`,
  )

  // Handle horizontal rules (e.g., ---)
  vueMailTemplate = vueMailTemplate.replace(
    patterns.hr,
    `<hr${withDataAttr ? ' data-id="vue-email-hr"' : ''}${
      parseCssInJsToInlineCss(finalStyles.hr) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"`
        : ''
    }/>`,
  )

  return DOMPurify.sanitize(vueMailTemplate, {
    USE_PROFILES: { html: true },
  })
}
