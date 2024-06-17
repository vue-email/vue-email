import type { App, CSSProperties, VNode } from 'vue'

import type { TailwindConfig } from '../index'
import { separateMediaQueriesFromCSS } from '../css/media-queries/separate-media-queries-from-css'
import { rulesFor } from '../css/rules-for'
import { getCssForMarkup } from '../tailwindcss/get-css-for-markup'
import { useRgbNonSpacedSyntax } from '../compatibility/use-rgb-non-spaced-syntax'
import { cssToJsxStyle } from '../compatibility/css-to-jsx-style'
import { unescapeClass } from '../compatibility/unescape-class'
import { sanitizeRuleSelector } from '../compatibility/sanitize-rule-selector'
import { makeAllRulePropertiesImportant } from '../compatibility/make-all-rule-properties-important'

/**
 * Gets all the necessary information from the node and the Tailwind config to be able
 * to apply all the Tailwind styles.
 */
export async function useTailwindStyles(
  markup: string,
  config: TailwindConfig,
) {
  const css = useRgbNonSpacedSyntax(getCssForMarkup(markup, config))

  const [cssWithoutMediaQueries, mediaQueries]
    = separateMediaQueriesFromCSS(css)

  const stylePerClassMap: Record<string, CSSProperties> = {}
  for (const rule of rulesFor(cssWithoutMediaQueries)) {
    const unescapedClass = unescapeClass(rule.selector)
    stylePerClassMap[unescapedClass] = cssToJsxStyle(rule.content)
  }

  const nonInlinableClasses: string[] = []

  const sanitizedMediaQueries = mediaQueries.map((mediaQuery) => {
    let sanitizedMediaQuery = mediaQuery
    for (const rule of rulesFor(mediaQuery)) {
      nonInlinableClasses.push(unescapeClass(rule.selector))

      sanitizedMediaQuery = sanitizedMediaQuery.replace(
        rule.value,
        rule.value
          .replace(rule.selector, sanitizeRuleSelector(rule.selector))
          .replace(rule.content, makeAllRulePropertiesImportant(rule.content))
          .trim(),
      )
    }
    return sanitizedMediaQuery
      .replace(/(\r\n|\r|\n)+/g, '')
      .replace(/\s+/g, ' ')
  })

  return {
    stylePerClassMap,
    sanitizedMediaQueries,
    nonInlinableClasses,
  }
}
