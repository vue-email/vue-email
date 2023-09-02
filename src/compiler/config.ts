import { deepmerge } from '../utils/assign-deep'
import type { Options } from '../types/compiler'

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
