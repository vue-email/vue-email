import type { CorePluginsConfig } from 'tailwindcss/types/config'
import type { TailwindConfig } from '../../components/ETailwind'

export async function getCssForMarkup(markup: string, config: TailwindConfig | undefined) {
  const corePlugins = config?.corePlugins as CorePluginsConfig

  const tailwindConfig = {
    ...config,
    corePlugins: {
      preflight: false,
      ...corePlugins,
    },
  }

  const tailwindcss = await (await import('tailwindcss')).default
  const postcss = await (await import('postcss')).default
  const postcssCssVariables = await (await import('postcss-css-variables')).default

  if (!tailwindcss)
    throw new Error('tailwindcss is not defined')

  const processor = postcss([
    tailwindcss({
      ...tailwindConfig,
      content: [{ raw: markup, extension: 'html' }],
    }),
    postcssCssVariables(),
  ])
  const result = await processor.process(
    String.raw`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        `,
    { from: undefined }, // no need to use from since the `content` context is sent into tailwind
  )

  return result.css
}
