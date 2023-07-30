export default defineAppConfig({
  ui: {
    gray: 'cool',
    primary: 'emerald',
  },
  uiKit: {
    variables: {
      light: {
        background: '255 255 255',
        foreground: 'var(--color-gray-700)',
        border: 'var(--color-gray-200)',
      },
      dark: {
        background: 'var(--color-gray-900)',
        foreground: 'var(--color-gray-200)',
        border: 'var(--color-gray-800)',
      },
      header: {
        height: '4rem',
      },
    },
    header: {
      background: 'bg-background/75 backdrop-blur',
      border: 'border-b border-border -mb-px',
      position: 'sticky top-0 z-50',
      height: 'h-[--header-height]',
    },
    main: {
      height: 'min-h-[calc(100vh-var(--header-height))]',
    },
    docs: {
      aside: {
        base: 'hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))]',
        position: 'lg:sticky lg:top-[var(--header-height)]',
        padding: 'py-8 lg:pr-8 lg:pl-[2px]',
      },
    },
  },
})
