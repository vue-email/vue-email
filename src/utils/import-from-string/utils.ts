import { dirname, isAbsolute, resolve, sep } from 'node:path'
import { URL, fileURLToPath, pathToFileURL } from 'node:url'
import type { Context } from 'node:vm'
import vm from 'node:vm'

export function isInESModuleScope(): boolean {
  try {
    return module === undefined
  } catch {
    return true
  }
}

export const isVMModuleAvailable = (): boolean => vm.Module !== undefined

const FILE_URL_PROTOCOL = 'file:'

const isFileURL = (value: string): boolean => value.startsWith(FILE_URL_PROTOCOL)

export function ensureFileURL(value: string): string {
  return isFileURL(value) ? value : pathToFileURL(value).toString()
}

export function ensurePath(value: string): string {
  return isFileURL(value) ? fileURLToPath(value) : value
}

const internalFunctionNames: readonly string[] = ['getCallerDirname', 'requireFromString', 'importFromStringSync', 'importFromString', 'processTicksAndRejections']

export function getCallerDirname(): string {
  const __prepareStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = (_err, stackTraces) => stackTraces
  const callSites = (new Error('error').stack as unknown as NodeJS.CallSite[]).filter((callSite) => {
    const functionName = callSite.getFunctionName()
    return functionName === null || !internalFunctionNames.includes(functionName)
  })
  Error.prepareStackTrace = __prepareStackTrace
  const caller = callSites[0]
  const callerFilename = caller.getFileName() ?? process.argv[1]
  return dirname(ensurePath(callerFilename))
}

function ensureTrailingSeparator(dirname: string): string {
  const separator = isFileURL(dirname) ? '/' : sep
  return dirname.endsWith(separator) ? dirname : `${dirname}${separator}`
}

export function getModuleFilename(dirname: string, filename: string): string {
  if (isInESModuleScope()) {
    if (isFileURL(filename)) {
      return filename
    } else {
      const validatedDirname = ensureTrailingSeparator(dirname)
      return new URL(filename, ensureFileURL(validatedDirname)).toString()
    }
  } else {
    return resolve(ensurePath(dirname), ensurePath(filename))
  }
}

function forEachPropertyKey(context: Context, callbackfn: (propertyKey: string | symbol) => void): void {
  Object.getOwnPropertyNames(context).forEach(callbackfn)
  Object.getOwnPropertySymbols(context).forEach(callbackfn)
}

function shallowMergeContext(target: Context, source: Context): Context {
  forEachPropertyKey(source, (propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      ...Object.getOwnPropertyDescriptor(source, propertyKey),
    })
  })
  return target
}

const __GLOBAL__ = global

function getCurrentGlobal(): Context {
  const currentGlobal = shallowMergeContext({}, __GLOBAL__)
  delete currentGlobal.global
  delete currentGlobal.globalThis
  return currentGlobal
}

export function createGlobalObject(globals: Context, useCurrentGlobal: boolean): Context {
  const globalObject = useCurrentGlobal
    ? getCurrentGlobal()
    : Object.defineProperty({}, Symbol.toStringTag, {
        ...Object.getOwnPropertyDescriptor(__GLOBAL__, Symbol.toStringTag),
      })
  forEachPropertyKey(globals, (propertyKey) => {
    if (propertyKey in __GLOBAL__) {
      Object.defineProperty(globalObject, propertyKey, {
        ...Object.getOwnPropertyDescriptor(__GLOBAL__, propertyKey),
        value: globals[propertyKey as keyof Context],
      })
    } else {
      Object.defineProperty(globalObject, propertyKey, {
        ...Object.getOwnPropertyDescriptor(globals, propertyKey),
      })
    }
  })
  return globalObject
}

export function createContextObject(moduleContext: Context, globalObject: Context): Context {
  const contextObject: Context = shallowMergeContext(moduleContext, globalObject)
  if (!('global' in contextObject)) {
    contextObject.global = contextObject
  }
  return contextObject
}

export function resolveModuleSpecifier(specifier: string, dirname: string): string {
  if (isFileURL(specifier)) {
    return specifier
  }
  return specifier.startsWith('.') || isAbsolute(specifier) ? resolve(ensurePath(dirname), specifier) : specifier
}
