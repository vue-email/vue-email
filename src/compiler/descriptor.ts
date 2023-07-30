import path from 'node:path'
import { createHash } from 'node:crypto'
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
  descriptor.id = generateId(normalizedPath + (isProd ? source : ''))

  return { descriptor, errors }
}

// Generate a unique identifier for each template
function generateId(text: string) {
  return createHash('sha256').update(text).digest('hex').substring(0, 8)
}
