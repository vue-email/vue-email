import { computed, ref } from 'vue'
import { withBase } from 'ufo'
import { useDebounceFn } from '@vueuse/core'

export const base = ref('/')
export const refreshTime = ref(Date.now())

export const hostname = window.location.host
export const host = computed(() => withBase(base.value, `${window.location.protocol}//${hostname}`))
export const slowRefreshSources = useDebounceFn(() => {
  refreshTime.value = Date.now()
}, 1000)
