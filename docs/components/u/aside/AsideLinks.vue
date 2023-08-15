<script setup lang="ts">
import { omit } from 'lodash-es'
import type { Link } from 'types'

const props = withDefaults(
  defineProps<{
    level?: number
    links?: Link[]
  }>(),
  {
    level: 0,
    links: () => [],
  },
)

interface LinkGroup {
  type: 'link' | 'accordion'
  children: Link[]
}

const appConfig = useAppConfig()

const groups = computed<LinkGroup[]>(() => {
  const groups = []

  let group = { type: null, children: [] }

  for (const link of props.links) {
    const type = link.children?.length ? 'accordion' : 'link'
    if (!group.type) {
      group.type = type
    }

    if (group.type === type) {
      group.children.push(link)
    } else {
      groups.push(group)
      group = { type, children: [link] }
    }
  }

  if (group.children.length) {
    groups.push(group)
  }

  return groups
})

// Methods

function mapItems(links: Link[] = []) {
  return links?.map((link) => ({ label: link.label, icon: link.icon, slot: String(link.to), children: link.children }))
}
</script>

<template>
  <div v-if="groups?.length" class="space-y-2">
    <template v-for="(group, index) in groups" :key="index">
      <UAccordion
        v-if="group.type === 'accordion'"
        :items="mapItems(group.children)"
        default-open
        multiple
        :ui="{
          wrapper: `w-full ${level > 0 ? 'border-l border-gray-200 dark:border-gray-800 -ml-px pl-px hover:border-gray-400 dark:hover:border-gray-500' : ''}`,
          item: { padding: 'mb-4 lg:mb-8' },
        }"
      >
        <template #default="{ item, open }">
          <ULink
            class="flex items-center gap-2 group mb-3 w-full"
            :class="[level > 0 && 'border-l -ml-px pl-4']"
            active-class="text-primary-500 dark:text-primary-400 border-current"
            inactive-class="text-gray-900 dark:text-gray-200 border-transparent"
          >
            <UIcon v-if="item.icon" :name="item.icon" class="w-4 h-4 flex-shrink-0" />

            <span class="text-sm font-semibold leading-6 truncate">{{ item.label }}</span>
            <UIcon
              :name="appConfig.ui.accordion.default.openIcon"
              class="w-5 h-5 ms-auto transform transition-transform duration-200 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 flex-shrink-0"
              :class="[open ? 'text-gray-900 dark:text-gray-200' : '-rotate-90']"
            />
          </ULink>
        </template>

        <template v-for="{ to } in group.children" :key="to" #[to]="{ item }">
          <UAsideLinks
            :links="item.children"
            :level="level + 1"
            :style="{ marginLeft: `${0.5 * (level + 1) + 0.5 * level}rem` }"
            class="ml-8 space-y-2 border-l border-gray-200 dark:border-gray-800"
          />
        </template>
      </UAccordion>

      <template v-else>
        <ULink
          v-for="(link, subIndex) in group.children"
          :key="subIndex"
          v-bind="omit(link, ['label', 'icon', 'iconClass', 'badge', 'children'])"
          class="flex items-center gap-2 group"
          :class="[level > 0 && 'border-l -ml-px pl-4']"
          active-class="text-primary-500 dark:text-primary-400 font-medium border-current"
          inactive-class="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 border-transparent hover:border-gray-400 dark:hover:border-gray-500"
        >
          <UIcon v-if="link.icon" :name="link.icon" class="w-4 h-4 flex-shrink-0" :class="link.iconClass" />

          <span class="text-sm leading-6 truncate">{{ link.label }}</span>

          <UBadge v-if="link.badge" size="xs" :ui="{ rounded: 'rounded-full' }">
            {{ link.badge }}
          </UBadge>
        </ULink>
      </template>
    </template>
  </div>
</template>
