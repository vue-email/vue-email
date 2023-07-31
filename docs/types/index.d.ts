import type { NuxtLinkProps } from '#app'

export interface Link extends NuxtLinkProps {
  label: string
  to: string
  class?: string
  icon?: string
  iconClass?: string
  badge?: string
  children?: Link[]
}

export type HeaderLink = Omit<Link, 'icon' | 'iconClass' | 'children'>
export type FooterLink = Omit<Link, 'icon' | 'iconClass' | 'children'>
