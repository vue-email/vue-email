<script setup lang="ts">
import { ref } from 'vue'
import { cleanDoubleSlashes, resolveURL } from 'ufo'
import { config } from '../config'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const baseUrl = config && config.baseUrl ? config.baseUrl : null
const src = ref(props.src)

if (baseUrl) {
  src.value = resolveURL(baseUrl, src.value)
  src.value = cleanDoubleSlashes(src.value)
}
</script>

<template>
  <img data-id="__vue-email-img" style="display: block; outline: none; border: none; text-decoration: none" :src="src" />
</template>
