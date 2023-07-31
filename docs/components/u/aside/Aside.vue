<script setup lang="ts">
defineProps<{
  links?: Link[]
  anchors?: Link[]
}>()

const appConfig = useAppConfig()

const ui = computed(() => appConfig.uiKit.docs.aside)
</script>

<template>
  <aside :class="[ui.base, ui.padding, ui.position]">
    <div class="relative">
      <div v-if="$slots.top" class="sticky -top-8 -mt-8 -mx-4 px-4 pointer-events-none z-[1]">
        <div class="h-8 bg-background" />
        <div class="bg-background relative pointer-events-auto flex">
          <slot name="top" />
        </div>
        <div class="h-8 bg-gradient-to-b from-background" />
      </div>

      <slot name="anchors">
        <UAsideAnchors :links="anchors" />
      </slot>

      <slot>
        <UAsideLinks :links="links" />
      </slot>

      <slot name="bottom" />
    </div>
  </aside>
</template>
