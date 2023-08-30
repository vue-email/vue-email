import { useStorage } from '@vueuse/core'
import type { PreviewModes } from '@/types/settings'

export function useTool() {
  const previewModes: PreviewModes[] = [
    {
      id: 'both',
      label: 'Both',
      icon: 'i-fluent-arrow-bidirectional-left-right-24-filled',
    },
    {
      id: 'code',
      label: 'Code',
      icon: 'i-fluent-code-24-filled',
    },
    {
      id: 'iframe',
      label: 'Iframe',
      icon: 'i-fluent-earth-24-filled',
    },
  ]

  const isCommandPalletOpen = useState<boolean>('isCommandPalletOpen')
  const isSettingsOpen = useState<boolean>('isSettingsOpen')
  const horizontalSplit = useStorage<boolean>('horizontalSplit', false)
  const email = useStorage<string>('email', '')
  const previewMode = useStorage<PreviewModes>('previewMode', previewModes[0])

  return {
    isCommandPalletOpen,
    isSettingsOpen,
    horizontalSplit,
    email,
    previewMode,
    previewModes,
  }
}
