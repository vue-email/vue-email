import { createSharedComposable } from '@vueuse/core'

function _useUIKit() {
  const isDocsSearchOpen = ref(false)

  return {
    isDocsSearchOpen,
  }
}

export const useUIKit = createSharedComposable(_useUIKit)
