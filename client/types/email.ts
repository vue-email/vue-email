export interface Email {
  label: string
  to?: string
  children?: Email[]
  component?: string
  icon?: string
}

export type ActiveView = 'desktop' | 'mobile' | 'source'
export type ActiveLang = 'html' | 'txt'

export interface Template {
  html: string
  txt: string
}

export interface MarkupProps {
  language: ActiveLang
  content: string
}
