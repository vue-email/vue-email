/**
 * Replaces special characters to avoid problems on email clients.
 *
 * @param className - This should not come with any escaped charcters, it should come the same
 * as is on the `className` attribute on Vue elements.
 */
export function sanitizeClassName(className: string) {
  return className
    .replaceAll('+', 'plus')
    .replaceAll('[', '')
    .replaceAll('%', 'pc')
    .replaceAll(']', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('!', 'imprtnt')
    .replaceAll('>', 'gt')
    .replaceAll('<', 'lt')
    .replaceAll('=', 'eq')
    .replace(/[^\w\-]/g, '_')
}
