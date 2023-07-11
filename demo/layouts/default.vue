<script lang="ts" setup>
const { emails } = useEmail()
const links = computed(() => (emails.value ? emails.value : []))
</script>

<template>
  <div
    v-if="links && links.length"
    class="w-full min-h-screen bg-dark-6 text-light-9 grid grid-cols-[20rem_1fr] font-sans overflow-hidden"
  >
    <aside class="min-h-full bg-dark-8 border-r border-r-dark px-6">
      <nav class="flex flex-col gap-4 mt-16">
        <p
          class="text-sm flex items-center font-semibold text-gray-900 dark:text-gray-200 truncate leading-6"
        >
          <UIcon name="i-ph-folder-duotone" class="text-xl mr-2" />
          All Emails
        </p>
        <UVerticalNavigation
          :links="links"
          :ui="{
            wrapper:
              'border-s border-gray-200 dark:border-gray-800 space-y-2 ml-3',
            base: 'group flex items-center gap-x-1 border-s -ms-px lg:leading-6',
            padding: 'ps-4',
            rounded: '',
            font: '',
            ring: '',
            icon: {
              base: 'text-xl',
              active: 'text-primary-500 dark:text-primary-400',
            },
            active:
              'text-primary-500 dark:text-primary-400 border-current font-semibold',
            inactive:
              'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
          }"
        />
      </nav>
    </aside>
    <div>
      <main class="bg-dark min-h-screen">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
