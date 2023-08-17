import { importFromStringSync } from 'module-from-string'
import type { DefineConfig } from '../../types/compiler'
import { createTemplateRenderSetup } from '../agnostic/template'
import { createCompiler } from '../agnostic'

async function importFromString<T>(source: string): Promise<T> {
  return importFromStringSync(source).default
}

export { readFile } from '../agnostic'
export const templateRender = createTemplateRenderSetup(importFromString)
export const config: DefineConfig = createCompiler(templateRender)
