<script setup lang="ts">
const items = [
  {
    title: 'Components',
    description: 'A set of components to build your next email template.',
    icon: 'i-fluent-archive-multiple-24-regular',
    background: 'bg-emerald-600',
    to: 'https://www.vuemail.net/getting-started#components',
  },
  {
    title: 'Integrations',
    description: 'Integrate with your favorite tools and services.',
    icon: 'i-fluent-crop-interim-24-regular',
    background: 'bg-yellow-600',
    to: 'https://www.vuemail.net/getting-started#integrations',
  },
  {
    title: 'SSR',
    description: 'Server-side rendering for your email templates.',
    icon: 'i-fluent-server-24-regular',
    background: 'bg-indigo-600',
    to: 'https://www.vuemail.net/getting-started/ssr',
  },
  {
    title: 'Releases',
    description: 'Stay up to date with the latest releases.',
    icon: 'i-fluent-rocket-24-regular',
    background: 'bg-pink-600',
    to: 'https://github.com/Dave136/vue-email/releases',
  },
  {
    title: 'Examples',
    description: 'A collection of examples to get you started.',
    icon: 'i-fluent-text-grammar-options-24-filled',
    background: 'bg-purple-600',
    to: 'https://www.vuemail.net/playground',
  },
  {
    title: 'GitHub',
    description: 'Contribute to Vue Email on GitHub.',
    icon: 'i-ph-github-logo',
    background: 'bg-gray-600',
    to: 'https://github.com/Dave136/vue-email',
  },
]
</script>

<template>
  <div class="h-screen flex justify-center">
    <div class="max-w-3xl px-4 md:px-8 py-20 md:py-40">
      <div class="text-center">
        <UIcon name="i-twemoji-incoming-envelope" class="w-20 h-20" />
        <h2 class="text-xl text-gray-100 font-medium">Welcome to the Vue Email Dev Tools!</h2>
        <p class="mt-2 mb-4 text-sm text-gray-100 font-normal">
          To start developing your next email template, you can create a
          <UKbd>.vue</UKbd> file under the <UKbd>emails</UKbd> folder.
        </p>
      </div>

      <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-500 py-6 sm:grid-cols-2">
        <li v-for="(item, itemIdx) in items" :key="itemIdx" class="flow-root">
          <NuxtLink target="_blank" :to="item.to" external class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 hover:bg-gray-800">
            <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg" :class="[item.background]">
              <UIcon :name="item.icon" class="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-100 focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <span>{{ item.title }}</span>
                <span aria-hidden="true"> &rarr;</span>
              </h3>
              <p class="mt-1 text-sm text-gray-300">{{ item.description }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
