/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
// @ts-ignore deno import
import { transform } from 'https://deno.land/x/swc@0.2.1/mod.ts'

interface ITransformReturnType {
  code: string
}

export async function importFromString<T>(str: string): Promise<T> {
  const { code }: ITransformReturnType = await transform(str, {
    jsc: {
      target: 'es2019',
      parser: {
        syntax: 'typescript',
      },
    },
  })
  const toBase64 = (str: string) => `data:application/javascript;base64,${btoa(str)}`
  const mod = await import(toBase64(code))
  return mod
}
