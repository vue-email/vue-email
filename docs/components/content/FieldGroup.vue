<template>
  <div class="mt-5 space-y-5 divide-y divide-gray-200 dark:divide-gray-800 [&>div]:pt-5 [&>div:first-child]:pt-0 [&>div:first-child]:mt-0">
    <ContentSlot unwrap="p" :use="$slots.default" />
  </div>
</template>
