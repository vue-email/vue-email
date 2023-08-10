<script lang="ts" setup>
const { emails } = useEmail()
const links = computed(() => (emails.value ? emails.value : []))
</script>

<template>
  <div v-if="links && links.length" class="flex h-screen">
    <aside class="min-w-[275px] max-w-[275px] min-h-full bg-gray-900 border-r border-r-gray-600 px-6">
      <nav class="flex flex-col gap-4">
        <NuxtLink class="flex flex-row my-4" to="/">
          <img class="self-center" src="/icon.svg" alt="Vue Email" />
          <h1 class="text-xl font-semibold text-gray-200 ml-2 self-center">vue-email</h1>
        </NuxtLink>
        <p class="text-sm flex items-center font-semibold text-gray-200 truncate leading-6">
          <UIcon name="i-ph-folder-duotone" class="text-xl mr-2" />
          All Emails
        </p>
        <Navigation :links="links" />
      </nav>
    </aside>
    <main class="w-[calc(100%_-_275px)] bg-gray-800">
      <NuxtPage />
    </main>
    <UNotifications />
  </div>
</template>
