export default function cleanup(str: string) {
  if (!str || typeof str !== 'string') return str

  return str
    .replace(/ data-v-inspector="[^"]*"/g, '')
    .replace(/<!--\[-->/g, '')
    .replace(/<!--]-->/g, '')
    .replace(/<template>/g, '')
    .replace(/<template[^>]*>/g, '')
    .replace(/<\/template>/g, '')
}
