import { useStorage } from '@vueuse/core'

export function useTool() {
  const isCommandPalletOpen = useState<boolean>('isCommandPalletOpen')
  const isSettingsOpen = useState<boolean>('isSettingsOpen')
  const settings = useStorage('settings', {
    horizontalSplit: false,
    email: '',
  })

  return {
    isCommandPalletOpen,
    isSettingsOpen,
    settings,
  }
}
