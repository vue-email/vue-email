export interface Email {
  label: string;
  component: string;
  to: string;
  icon: string;
}

export type ActiveView = 'desktop' | 'mobile' | 'source'
export type ActiveLang = 'html' | 'md'

export interface Template {
  html: string;
  plainText: string;
}

export interface MarkupProps {
  language: ActiveLang;
  content: string;
}
