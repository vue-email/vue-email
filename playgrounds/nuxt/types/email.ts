export interface Email {
  label: string
  to?: string
  children?: Email[]
  component?: string
  resComponent?: string
  icon?: string
}

export type ActiveView = 'desktop' | 'mobile' | 'source'
export type ActiveLang = 'vue' | 'html' | 'txt'

export interface Template {
  vue: string
  html: string
  text: string
}

export interface MarkupProps {
  language: ActiveLang
  content: string
}
