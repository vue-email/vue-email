import { computed, ref } from 'vue'
import { withBase } from 'ufo'

export const base = ref('/')

export const hostname = window.location.host
export const host = computed(() => withBase(base.value, `${window.location.protocol}//${hostname}`))
