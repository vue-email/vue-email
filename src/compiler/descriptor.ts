import path from 'node:path'
import type * as _compiler from 'vue/compiler-sfc'

interface ResolvedOptions {
  compiler: typeof _compiler
  root: string
  isProd?: boolean
}

export function createDescriptor(filename: string, source: string, { root, isProd, compiler }: ResolvedOptions): _compiler.SFCParseResult {
  const { descriptor, errors } = compiler.parse(source, {
    filename,
  })

  const normalizedPath = path.normalize(path.relative(root, filename))
  descriptor.id = filename.toLowerCase() + normalizedPath + (isProd ? source : '')

  return { descriptor, errors }
}
