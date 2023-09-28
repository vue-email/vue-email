export interface Email {
  label: string
  filename: string
  content: string
  icon: string
  size: number
  created: Date
  modified: Date
}

export interface Directory {
  label: string
  email: Email
  children: Email[]
}

export type ActiveView = 'desktop' | 'mobile' | 'source'
export type ActiveLang = 'html' | 'txt' | 'vue'

export interface Template {
  vue: string
  html: string
  txt: string
}

export interface MarkupProps {
  language: ActiveLang
  content: string
}
