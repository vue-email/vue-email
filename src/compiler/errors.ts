import type { Options } from '$src/types'

export class MissingConfigurationOptionError extends Error {
  constructor(missing: (keyof Options)[]) {
    super(`The following required configuration options are missing: ${missing.join(', ')}`)

    this.name = 'MissingConfiguration'
  }
}
