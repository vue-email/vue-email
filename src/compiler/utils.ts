import { env as $env } from 'node:process'

export function env(name: string): string | null | undefined {
  return $env[name]
}

export const isProd: boolean = env('NODE_ENV') === 'production'
