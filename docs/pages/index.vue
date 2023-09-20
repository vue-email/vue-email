<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { data: module } = await useFetch<{
  stats: {
    downloads: number
    stars: number
  }
  contributors: {
    username: string
  }[]
}>('https://api.nuxt.com/modules/vue-email', {
  transform: ({ stats, contributors }) => ({ stats, contributors }),
})

const source = ref('pnpm add vue-email')

const { copy, copied } = useClipboard({ source })
const breakpoints = useBreakpoints(breakpointsTailwind)

const mdAndLarger = breakpoints.greaterOrEqual('md')
const lgAndLarger = breakpoints.greaterOrEqual('lg')
const xlAndLarger = breakpoints.greaterOrEqual('xl')

const title = 'VueEmail: Build and send emails using Vue'
const desc = 'It provides everything related to Building and sending emails using Vue. This includes components, render utilities, published under MIT License.'

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  ogImage: 'https://www.vuemail.net/social-preview.jpg',
  twitterImage: 'https://www.vuemail.net/social-preview.jpg',
})

const { format } = Intl.NumberFormat('en-GB', { notation: 'compact' })
</script>

<template>
  <span class="gradient" />

  <ULandingHero orientation="horizontal" class="!py-18 md:py-0 md:!pt-32 relative" :ui="{ container: 'flex lg:gap-4' }">
    <div class="hidden lg:block relative w-[500px]">
      <Illustration class="h-[480px]" />
    </div>
    <template #title> The next generation of writing <span class="text-primary-400">emails</span> </template>
    <template #description> A collection of high-quality, unstyled components for creating beautiful emails using Vue and TypeScript. </template>
    <template #links>
      <UButton to="/getting-started/installation" icon="i-ph-rocket-launch-duotone" size="xl"> Get started </UButton>
      <UInput
        aria-label="Copy code to get started"
        :model-value="source"
        name="get-started"
        disabled
        autocomplete="off"
        size="xl"
        :ui="{ base: 'disabled:cursor-default', icon: { trailing: { pointer: '' } } }"
      >
        <template #leading>
          <UIcon name="i-ph-terminal" />
        </template>
        <template #trailing>
          <UButton
            aria-label="Copy Code"
            :color="copied ? 'green' : 'gray'"
            variant="ghost"
            :padded="false"
            :icon="copied ? 'i-ph-check-square-duotone' : 'i-ph-copy-duotone'"
            @click="copy(source)"
          />
        </template>
      </UInput>
    </template>
  </ULandingHero>

  <ULandingSection>
    <template #title> Build and send emails using <br /><span class="text-primary-400">Vue and TypeScript.</span> </template>
    <UPageGrid>
      <ULandingCard
        to="/getting-started/ssr"
        title="SSR Support"
        icon="i-solar-server-2-bold-duotone"
        description="Streamline the process of rendering and dispatching emails directly from your server."
      />
      <ULandingCard
        to="/getting-started/i18n"
        title="i18n Support"
        icon="i-solar-globus-bold-duotone"
        description="Sprinkle some global flavor onto your vue email templates with our new i18n feature!"
      />
      <ULandingCard
        to="/components/html"
        title="15+ Components"
        icon="i-ph-plug-duotone"
        description="Simplify email creation by providing ready-made components, eliminating the need for table-based layouts and outdated markup."
      />
      <ULandingCard
        to="/integrations/mailersend"
        title="Integrations"
        icon="i-solar-bolt-line-duotone"
        description="Use your favorite email provider with VueEmail. Any Node.js email provider can be used with VueEmail."
      />
      <ULandingCard
        to="/getting-started/devtools"
        title="Nuxt Devtools"
        icon="i-ph-magic-wand-duotone"
        description="Inspect your email templates and send test emails from your app directly."
      />
      <ULandingCard
        to="/components/tailwind"
        title="Tailwind CSS"
        icon="i-solar-palette-round-line-duotone"
        description="
      Deliver visually stunning email templates with the incredible power of Tailwind CSS."
      />
    </UPageGrid>
  </ULandingSection>

  <ULandingSection class="!pt-0">
    <ULandingCTA
      align="left"
      card
      :ui="{
        background: 'dark:bg-gradient-to-b from-gray-800 to-gray-900',
        shadow: 'dark:shadow-2xl',
        body: {
          background: 'bg-gray-50/50 dark:bg-gray-900/50',
        },
        title: 'text-center lg:text-left',
        links: 'justify-center lg:justify-start',
      }"
    >
      <template #title>
        <span>
          Trusted and supported by our<br class="hidden lg:block" />
          amazing community
        </span>
      </template>

      <template #links>
        <ClientOnly>
          <UAvatarGroup :max="xlAndLarger ? 13 : lgAndLarger ? 10 : mdAndLarger ? 16 : 8" size="md" class="flex-wrap-reverse [&_span:first-child]:text-xs justify-center">
            <UTooltip
              v-for="(contributor, index) of module.contributors"
              :key="index"
              :text="contributor.username"
              class="rounded-full"
              :ui="{ background: 'bg-gray-50 dark:bg-gray-800/50' }"
              :popper="{ offsetDistance: 16 }"
            >
              <UAvatar
                :alt="contributor.username"
                :src="`https://ipx.nuxt.com/s_40x40/gh_avatar/${contributor.username}`"
                :srcset="`https://ipx.nuxt.com/s_80x80/gh_avatar/${contributor.username} 2x`"
                class="lg:hover:scale-125 lg:hover:ring-2 lg:hover:ring-primary-500 dark:lg:hover:ring-primary-400 transition-transform"
                width="40"
                height="40"
                size="md"
                loading="lazy"
              >
                <NuxtLink :to="`https://github.com/${contributor.username}`" :aria-label="contributor.username" target="_blank" class="focus:outline-none" tabindex="-1">
                  <span class="absolute inset-0" aria-hidden="true" />
                </NuxtLink>
              </UAvatar>
            </UTooltip>
          </UAvatarGroup>
        </ClientOnly>
      </template>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16">
        <NuxtLink class="text-center group" to="https://npmjs.org/package/@nuxt/ui" target="_blank">
          <p class="text-6xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400">{{ format(module.stats.downloads) }}+</p>
          <p>monthly downloads</p>
        </NuxtLink>

        <NuxtLink class="text-center group" to="https://github.com/nuxt/ui" target="_blank">
          <p class="text-6xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400">{{ format(module.stats.stars) }}+</p>
          <p>stars</p>
        </NuxtLink>
      </div>
    </ULandingCTA>
  </ULandingSection>
</template>

<style scoped>
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(50% 50% at 50% 50%, #00dc82 0%, rgba(0, 220, 130, 0) 100%);
  filter: blur(180px);
  opacity: 0.6;
  z-index: -1;
}
</style>
