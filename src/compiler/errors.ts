import type { Options } from './types'

export class MissingConfigurationOptionError extends Error {
  constructor(missing: (keyof Options)[]) {
    super(`The following required configuration options are missing: ${missing.join(', ')}`)

    this.name = 'MissingConfiguration'
  }
}
