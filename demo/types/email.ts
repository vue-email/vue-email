export interface Email {
  label: string;
  component: string;
  to: string;
  icon: string;
}

export type ActiveView = 'desktop' | 'mobile' | 'source'
export type ActiveLang = 'vue' | 'html' | 'txt'

export interface Template {
  vue: string;
  html: string;
  plainText: string;
}

export interface MarkupProps {
  language: ActiveLang;
  content: string;
}
