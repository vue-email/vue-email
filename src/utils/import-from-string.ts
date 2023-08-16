export function universalBtoa(str: string) {
  try {
    return btoa(str)
  } catch (err) {
    if ('Buffer' in globalThis) {
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore Buffer is a global
      // eslint-disable-next-line n/prefer-global/buffer
      return globalThis.Buffer.from(str).toString('base64')
    }
  }
}

export async function importFromString<T>(str: string): Promise<T> {
  const b64 = `data:text/javascript;base64,${universalBtoa(str)}`
  const { default: module } = await import(b64)
  return module
}
