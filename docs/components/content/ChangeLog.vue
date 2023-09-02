<template>
  <div>
    <GithubReleases v-slot="{ releases }">
      <div v-for="release in releases" :key="release.name" class="release">
        <div class="release-name">
          <NuxtLink :to="`https://github.com/Dave136/vue-email/releases/tag/${release.name}`" external target="_blank">
            {{ release.name }}
          </NuxtLink>
        </div>
        <div class="content">
          <h3 class="sr-only">Description</h3>

          <ContentRenderer :value="release">
            <template #empty>
              <p>No description provided</p>
            </template>
          </ContentRenderer>
        </div>
      </div>
    </GithubReleases>
  </div>
</template>

<style lang="scss" scoped>
.release {
  @apply relative flex overflow-hidden flex-1 p-4 overflow-y-auto;

  &.release + .release {
    @apply border-t border-gray-200 dark:border-gray-700;
  }

  .release-name {
    @apply relative pt-4 flex items-start justify-between gap-4 pb-4;

    a {
      @apply text-2xl font-bold text-primary-500 mt-8;

      @dark {
        @apply text-primary-400;
      }
    }
  }

  .content {
    @apply pl-8 pr-8;
  }
}
</style>
