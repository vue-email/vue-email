import colors from '#tailwind-config/theme/colors'

export function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (_, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${Number.parseInt(result[1], 16)} ${Number.parseInt(result[2], 16)} ${Number.parseInt(result[3], 16)}` : null
}

export default defineNuxtPlugin({
  enforce: 'post',
  setup(nuxtApp) {
    const appConfig = useAppConfig()
    const head = nuxtApp.vueApp._context.provides.usehead

    const root = computed(() => {
      const primary: Record<string, string> | undefined = colors[appConfig.ui.primary]
      const gray: Record<string, string> | undefined = colors[appConfig.ui.gray]

      return `:root {
        ${Object.entries(primary || colors.green)
          .map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value)};`)
          .join('\n')}
        --color-primary-DEFAULT: var(--color-primary-500);
        --element-background: 255 255 255; 
        --element-foreground: var(--color-gray-700);
        --header-height: 4rem;

        ${Object.entries(gray || colors.cool)
          .map(([key, value]) => `--color-gray-${key}: ${hexToRgb(value)};`)
          .join('\n')}
        }

        .dark {
          --color-primary-DEFAULT: var(--color-primary-400);
          --element-background: var(--color-gray-900); 
          --element-foreground: var(--color-gray-200);
        }
        `
    })

    if (process.server) {
      head.push({
        style: [
          {
            innerHTML: root.value,
            tagPriority: -2,
          },
        ],
      })
    }
  },
})
