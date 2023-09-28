import { deepmerge } from '@vue-email/utils'
import type { Options } from '@vue-email/types'

export function createInitConfig(options: Options) {
  const config = deepmerge<Options>(
    {
      verbose: true,
      options: options.options,
    },
    options,
  )

  return config
}
