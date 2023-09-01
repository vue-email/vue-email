export interface Settings {
  horizontalSplit: boolean
  email: string
}

export interface PreviewModes {
  id: 'both' | 'code' | 'iframe'
  label: string
  icon: string
}

export interface editorCodes {
  id: 'all' | 'html' | 'txt' | 'vue'
  label: string
  icon: string
}
