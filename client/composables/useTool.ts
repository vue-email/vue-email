import type { Settings } from '~/types/settings'

export function useTool() {
  const isCommandPalletOpen = useState<boolean>('isCommandPalletOpen')
  const isSettingsOpen = useState<boolean>('isSettingsOpen')
  const settings = useState<Settings>('settings', () => ({
    horizontalSplit: true,
    email: '',
  }))

  return {
    isCommandPalletOpen,
    isSettingsOpen,
    settings,
  }
}
