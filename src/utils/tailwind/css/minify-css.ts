export function minifyCss(css: string): string {
  // Thanks tw-to-css!
  // from https://github.com/vinicoder/tw-to-css/blob/main/src/util/format-css.ts
  return (
    css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')

      // Remove extra spaces after semicolons and colons
      .replace(/;\s+/g, ';')
      .replace(/:\s+/g, ':')

      // Remove extra spaces before and after brackets
      .replace(/\)\s*\{/g, '){') // Remove spaces before opening curly brace after closing parenthesis
      .replace(/\s+\(/g, '(') // Remove spaces before opening parenthesis
      .replace(/\{\s+/g, '{') // Remove spaces after opening curly brace
      .replace(/\}\s+/g, '}') // Remove spaces before closing curly brace
      .replace(/\s*\{/g, '{') // Remove spaces after opening curly brace
      .replace(/;?\s*\}/g, '}')
  ) // Remove extra spaces and semicolons before closing curly braces
}
