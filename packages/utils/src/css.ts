/**
 * Clean css selectors to replace all non-alphanumeric characters with underscores
 * @author Greg Mckelvey
 * @description This function is just a copy of original React-Email package.
 */
export function cleanCss(css: string) {
  const SELETORS_REGEX = /[.\!\#\w\d\\:\-\[\]\/\.%\(\))]+(?=\s*?{[^{]*?\})\s*?{/g
  const newCss = css
    .replace(/\\/g, '')
    // find all css selectors and look ahead for opening and closing curly braces
    .replace(SELETORS_REGEX, (m) => {
      return m.replace(/(.)([:#\!\-[\\\]\/\.%]+)/g, '$1_')
    })
    .replace(/font-family(?<value>[^;\r\n]+)/g, (m, value) => {
      return `font-family${value.replace(/['"]+/g, '')}`
    })

  return newCss
}

/**
 * Make a map of all class names and their css styles
 */
export function makeCssMap(css: string) {
  const cssNoMedia = css.replace(/@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm, '')

  const cssMap = cssNoMedia.split('}').reduce(
    (acc, cur) => {
      const [key, value] = cur.split('{')

      if (key && value) {
        acc[key] = value
      }

      return acc
    },
    {} as Record<string, string>,
  )

  return cssMap
}

/**
 * Get media query css to put in head
 */
export function getMediaQueryCss(css: string) {
  const mediaQueryRegex = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm

  return (
    css
      .replace(mediaQueryRegex, (m) => {
        return m.replace(/([^{]+\{)([\s\S]+?)(\}\s*\})/gm, (_, start, content, end) => {
          const newContent = (content as string).replace(/(?:[\s\r\n]*)?(?<prop>[\w-]+)\s*:\s*(?<value>[^};\r\n]+)/gm, (_, prop, value) => {
            return `${prop}: ${value} !important;`
          })

          return `${start}${newContent}${end}`
        })
      })
      // only return media queries
      .match(/@media\s*([^{]+)\{([^{}]*\{[^{}]*\})*[^{}]*\}/g)
      ?.join('') ?? ''
  )
}

export function testResponsiveStyles(style: string): boolean {
  return /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm.test(style)
}

export function testHTML(style: string): boolean {
  return /<html[^>]*>/gm.test(style)
}

export function testHead(style: string): boolean {
  return /<head[^>]*>/gm.test(style)
}

export const CLEAN_REGEX = /[:#\!\-[\]\/\.%]+/g

export function styleToObject(style: string): Record<string, string> {
  const styles: { [key: string]: string } = {}
  const stylePairs = style.split(';')

  stylePairs.forEach((pair) => {
    const keyValue = pair.split(':')

    if (keyValue.length === 2) {
      const key = keyValue[0].replace(/-([a-z])/g, (_, c) => c.toUpperCase()).trim()
      const value = keyValue[1].trim()

      styles[key] = value
    }
  })

  return styles
}
