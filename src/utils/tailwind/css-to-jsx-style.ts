// From https://github.com/jacobbuck/css-to-style

function camelCase(string: string) {
  return string.replace(/-(\w|$)/g, (_, p1: string) => p1.toUpperCase())
}

function convertPropertyName(prop: string) {
  let modifiedProp = prop

  modifiedProp = modifiedProp.toLowerCase()

  if (modifiedProp === 'float')
    return 'cssFloat'

  if (modifiedProp.startsWith('--'))
    return modifiedProp

  if (modifiedProp.startsWith('-ms-'))
    modifiedProp = modifiedProp.slice(1)

  return camelCase(modifiedProp)
}

export function getCssDeclarations(cssText: string) {
  return Array.from(
    cssText.matchAll(
      /([a-zA-Z0-9\-_]+)\s*:\s*('[^']*'[^;]*|"[^"]*"[^;]*|[^;]*?\([^)]*\)[^;]*|[^;(]*);?/gm,
    ),
  ).map(([_declaration, property, value]) => ({
    property,
    value: value.replaceAll(/[\r\n|\r|\n]+/g, '').replaceAll(/\s+/g, ' '),
  }))
}

export function cssToJsxStyle(cssText: string) {
  const style: Record<string, string> = {}
  const declarations = getCssDeclarations(cssText)
  for (const { property, value } of declarations) {
    if (property.length > 0 && value.trim().length > 0)
      style[convertPropertyName(property)] = value.trim()
  }
  return style
}
