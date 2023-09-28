import type { Context } from 'node:vm'
import { runInNewContext } from 'node:vm'
import { Module, createRequire } from 'node:module'
import type { TransformOptions } from 'esbuild'
import { transformSync } from 'esbuild'
import { nanoid } from 'nanoid/async'
import { createContextObject, createGlobalObject, ensurePath, getCallerDirname, getModuleFilename, isInESModuleScope, resolveModuleSpecifier } from './utils'

export interface Options {
  filename?: string | undefined
  dirname?: string | undefined
  globals?: Context | undefined
  useCurrentGlobal?: boolean | undefined
}

const USE_STRICT = '"use strict";'

const IMPORT_META_URL_SHIM = 'var import_meta_url = require("url").pathToFileURL(__filename).toString();'

const IMPORT_META_RESOLVE_SHIM = `function import_meta_resolve() {
  throw new Error(
    \`'import.meta.resolve' is not supported
Use asynchronous function 'importFromString' and enable '--experimental-vm-modules' CLI option.
Or use 'transformOptions' to include a polyfill. See https://github.com/evanw/esbuild/issues/1492#issuecomment-893144483 as an example.\`
  );
}`

function requireFromString(code: string, { filename = `${nanoid()}.js`, dirname = getCallerDirname(), globals = {}, useCurrentGlobal = false }: Options | undefined = {}): any {
  const moduleFilename = ensurePath(getModuleFilename(dirname, filename))
  const mainModule = isInESModuleScope() ? undefined : require.main
  const contextModule = new Module(moduleFilename, mainModule)

  contextModule.require = createRequire(moduleFilename)
  contextModule.filename = moduleFilename
  contextModule.paths = mainModule?.paths ?? []

  const globalObject = createGlobalObject(globals, useCurrentGlobal)
  const contextObject = createContextObject(
    {
      exports: contextModule.exports,
      require: contextModule.require,
      module: contextModule,
      __filename: contextModule.filename,
      __dirname: contextModule.path,
    },
    globalObject,
  )

  runInNewContext(code, contextObject, {
    filename: moduleFilename,
    // @ts-expect-error: experimental
    async importModuleDynamically(specifier: string) {
      return await import(resolveModuleSpecifier(specifier, contextModule.path))
    },
  })

  contextModule.loaded = true
  return contextModule.exports
}

function getCommonJS(transformOptions: TransformOptions | undefined): TransformOptions {
  return {
    ...transformOptions,
    banner: `${USE_STRICT}\n` + `${IMPORT_META_URL_SHIM}\n` + `${IMPORT_META_RESOLVE_SHIM}\n` + `${transformOptions?.banner ?? ''}`,
    define: {
      'import.meta.url': 'import_meta_url',
      'import.meta.resolve': 'import_meta_resolve',
      ...transformOptions?.define,
    },
    format: 'cjs',
  }
}

const ERR_REQUIRE_ESM = 'ERR_REQUIRE_ESM'

export interface ImportOptions extends Options {
  transformOptions?: TransformOptions | undefined
}

export function importFromStringSync(code: string, { transformOptions, ...options }: ImportOptions | undefined = {}): any {
  const { code: transformedCode } = transformSync(code, getCommonJS(transformOptions))
  try {
    return requireFromString(transformedCode, options)
  } catch (error) {
    if (error != null && (error as NodeJS.ErrnoException).code === ERR_REQUIRE_ESM) {
      throw new Error(
        `'import' statement of ES modules is not supported
  Use asynchronous function 'importFromString' instead or replace it with dynamic 'import()' expression.`,
      )
    }
    throw error
  }
}
