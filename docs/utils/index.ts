import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { Link } from '@ui-kit/types'

export function mapContentLinks(links: NavItem[]): Link[] {
  return links.map((link) => {
    const { title, _path, children, ...rest } = link

    return {
      label: title,
      to: _path,
      children: children ? mapContentLinks(children) : undefined,
      ...rest,
    }
  })
}
