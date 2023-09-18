import { useStorage } from '@vueuse/core'
import type { PreviewModes, editorCodes } from '@/types/settings'

interface UseToolParams {
  onReload?: () => Promise<void> | void
}

const RESET_TIMEOUT = 500

export function useTool(params?: UseToolParams) {
  const previewModes: PreviewModes[] = [
    {
      id: 'both',
      label: 'Both',
      icon: 'i-fluent-arrow-bidirectional-left-right-24-filled',
    },
    {
      id: 'code',
      label: 'Code',
      icon: 'i-fluent-code-24-filled',
    },
    {
      id: 'iframe',
      label: 'Iframe',
      icon: 'i-fluent-earth-24-filled',
    },
  ]

  const editorCodes: editorCodes[] = [
    {
      id: 'all',
      label: 'All',
      icon: 'i-ph-code-block-bold',
    },
    {
      id: 'vue',
      label: 'Vue',
      icon: 'i-ph-file-vue-bold',
    },
    {
      id: 'html',
      label: 'HTML',
      icon: 'i-ph-file-html-bold',
    },
    {
      id: 'txt',
      label: 'Text',
      icon: 'i-ph-text-t-bold',
    },
  ]

  const isCommandPalletOpen = useState<boolean>('isCommandPalletOpen')
  const isSettingsOpen = useState<boolean>('isSettingsOpen')
  const reloadTemplate = useState<boolean>('reloadTemplate')
  const horizontalSplit = useStorage<boolean>('horizontalSplit', false)
  const email = useStorage<string>('email', '')
  const previewMode = useStorage<PreviewModes>('previewMode', previewModes[0])
  const editorCode = useStorage<editorCodes>('editorCodes', editorCodes[0])

  watch(reloadTemplate, async () => {
    if (typeof params?.onReload == 'undefined' && typeof params?.onReload !== 'function' && !reloadTemplate.value) {
      return
    }

    if (typeof params?.onReload === 'function') {
      await params.onReload()
    }

    setTimeout(() => {
      reloadTemplate.value = false
    }, RESET_TIMEOUT)
  })

  return {
    isCommandPalletOpen,
    isSettingsOpen,
    reloadTemplate,
    horizontalSplit,
    email,
    previewMode,
    previewModes,
    editorCode,
    editorCodes,
  }
}
