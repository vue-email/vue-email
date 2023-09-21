import type { CSSProperties } from 'vue'

export interface StylesType {
  h1?: CSSProperties
  h2?: CSSProperties
  h3?: CSSProperties
  h4?: CSSProperties
  h5?: CSSProperties
  h6?: CSSProperties
  blockQuote?: CSSProperties
  bold?: CSSProperties
  italic?: CSSProperties
  link?: CSSProperties
  codeBlock?: CSSProperties
  codeInline?: CSSProperties
  p?: CSSProperties
  li?: CSSProperties
  ul?: CSSProperties
  ol?: CSSProperties
  image?: CSSProperties
  br?: CSSProperties
  hr?: CSSProperties
  table?: CSSProperties
  thead?: CSSProperties
  tbody?: CSSProperties
  tr?: CSSProperties
  th?: CSSProperties
  td?: CSSProperties
  strikethrough?: CSSProperties
}

export interface Patterns {
  h1?: RegExp
  h2?: RegExp
  h3?: RegExp
  h4?: RegExp
  h5?: RegExp
  h6?: RegExp
  blockQuote?: RegExp
  bold?: RegExp
  italic?: RegExp
  link?: RegExp
  codeBlock?: RegExp
  codeInline?: RegExp
  p?: RegExp
  li?: RegExp
  ul?: RegExp
  image?: RegExp
  br?: RegExp
  hr?: RegExp
  table?: RegExp
  strikethrough?: RegExp
}
