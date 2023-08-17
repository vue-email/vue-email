import { createTemplateRenderSetup } from '../agnostic/template'
import { createCompiler } from '../agnostic'
import { importFromString } from '../../utils/import-from-string'
import type { DefineConfig } from '../../types/compiler'

export { readFile } from '../agnostic'
export const templateRender = createTemplateRenderSetup(importFromString)
export const config: DefineConfig = createCompiler(templateRender)
