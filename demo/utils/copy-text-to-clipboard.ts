export async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    throw new Error('Not able to copy')
  }
}
