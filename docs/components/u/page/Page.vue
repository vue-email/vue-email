<template>
  <div class="grid lg:grid-cols-10 lg:gap-8">
    <div v-if="$slots.left" class="lg:col-span-2">
      <slot name="left" />
    </div>

    <div :class="[$slots.left || $slots.right ? 'lg:col-span-8' : 'lg:col-span-10']">
      <slot />
    </div>

    <div v-if="$slots.right" class="lg:col-span-2 order-first lg:order-last">
      <slot name="right" />
    </div>
  </div>
</template>
