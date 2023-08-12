export default function cleanup(str: string) {
  if (!str || typeof str !== 'string') return str

  return str.replace(/<!--\[-->/g, '').replace(/<!--]-->/g, '')
}
