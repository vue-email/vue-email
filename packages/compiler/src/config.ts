import { deepmerge } from 'vue-email'
import type { Options } from 'vue-email'

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
