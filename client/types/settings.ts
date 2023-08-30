export interface Settings {
  horizontalSplit: boolean
  email: string
}

export interface PreviewModes {
  id: 'both' | 'code' | 'iframe'
  label: string
  icon: string
}
