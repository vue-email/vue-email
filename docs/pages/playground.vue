<script setup>
const title = 'Playground'
const description = 'Play online with our interactive Vue Email playground.'

useSeoMeta({
  title,
  ogTitle: 'Vue Email Playground',
  description,
})

defineOgImage({
  component: 'Docs',
  title,
  description,
})
</script>

<template>
  <div class="h-[calc(100vh-var(--header-height))]">
    <ClientOnly>
      <iframe src="https://vue-email-demo.vercel.app/" width="100%" height="100%" />
    </ClientOnly>
  </div>
</template>
