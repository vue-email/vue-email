<script lang="ts">
export default { name: 'EIcon' }
</script>

<template>
  <span
    data-id="__vue-email-icon"
    :style="{
      width: sSize,
      height: sSize,
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundColor: 'currentcolor',
      '-webkit-mask-image': 'var(--svg)',
      maskImage: 'var(--svg)',
      '-webkit-mask-repeat': 'no-repeat',
      maskRepeat: 'no-repeat',
      '-webkit-mask-size': '100% 100%',
      maskSize: '100% 100%',
      '--svg': iconUrl,
    }"
  ></span>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, inject } from 'vue'
import { injectIconsKey } from '../composables'

const iconOptions: any = inject(injectIconsKey, () => ({}))

const aliases = iconOptions.aliases || {}

type AliasesKeys = keyof typeof aliases

const props = defineProps({
  name: {
    type: String as PropType<AliasesKeys | (string & object)>,
    required: true,
  },
  size: {
    type: String,
    default: '',
  },
})

const iconName = computed(() => (aliases || {})[props.name] || props.name)
const iconUrl = computed(() =>
  iconName.value
    ? `url('https://api.iconify.design/${iconName.value.replace(
      ':',
      '/',
    )}.svg')`
    : 'none',
)
const sSize = computed(() => {
  // Disable size if aliases.size === false
  if (!props.size && typeof aliases.size === 'boolean' && !aliases.size) {
    return undefined
  }
  const size = props.size || aliases.size || '1em'

  if (String(Number(size)) === size) {
    return `${size}px`
  }

  return size
})
</script>
