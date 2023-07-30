import * as process from 'node:process'

export function env(name: string): string | null | undefined {
  return process.env[name]
}
