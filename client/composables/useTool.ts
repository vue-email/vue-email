export function useTool() {
  const isCommandPalletOpen = useState<boolean>('isCommandPalletOpen')

  const toggleCommandPallet = () => {
    isCommandPalletOpen.value = !isCommandPalletOpen.value
  }

  return {
    isCommandPalletOpen,
    toggleCommandPallet,
  }
}
