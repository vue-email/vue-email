export function unescapeClass(singleClass: string) {
  return singleClass.replaceAll(/\\\d|\\/g, '')
}
