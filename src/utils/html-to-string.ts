import { convert } from 'html-to-text'

export default function htmlToText(html: string) {
  if (!html || typeof html !== 'string')
    return html

  return convert(html, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: '#__vue-email-preview', format: 'skip' },
    ],
  })
}
