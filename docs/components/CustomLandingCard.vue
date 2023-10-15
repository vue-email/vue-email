<script setup lang="ts">
import { twJoin } from 'tailwind-merge'
import type { NuxtLinkProps } from '#app'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    {
      title?: string
      description?: string
      icon?: string
      orientation?: 'vertical' | 'horizontal'
      ui?: Partial<typeof defaults>
    } & NuxtLinkProps
  >(),
  {
    title: '',
    description: undefined,
    icon: undefined,
    orientation: 'vertical',
    ui: () => ({}),
  },
)

const el = ref<HTMLDivElement>()

const slots = useSlots()
const { elementX, elementY } = useSharedMouseInElement(el)

const defaults = computed(() => {
  return {
    wrapper:
      'relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col',
    base: 'flex-1 flex flex-col',
    body: {
      base: twJoin(
        'gap-x-8 gap-y-4',
        props.orientation === 'vertical' && 'flex flex-col',
        !!slots.default && props.orientation === 'horizontal' && 'grid lg:grid-cols-2 lg:items-center',
      ),
    },
    background: 'bg-white/90 dark:bg-gray-900/90',
    ring: '',
    rounded: 'rounded-[12px]',
    icon: {
      wrapper: 'mb-2',
      base: 'w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white',
    },
    title: 'text-gray-900 dark:text-white text-base font-bold truncate',
    description: 'text-base text-gray-500 dark:text-gray-400 mt-1',
  }
})

const { ui, attrs } = useUI('landing.card', props.ui, defaults, { mergeWrapper: true })

function getSlotChildrenText(children) {
  return (
    children
      // eslint-disable-next-line array-callback-return
      .map((node) => {
        if (!node.children || typeof node.children === 'string') return node.children || ''
        else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
        else if (node.children.default) return getSlotChildrenText(node.children.default())
      })
      .join('')
  )
}

const omittedProps = new Set(['title', 'description', 'icon', 'ui'])
const nuxtLinkProps = computed(() => {
  const _props = {}

  for (const prop in props) {
    if (omittedProps.has(prop) || !props[prop]) {
      continue
    }
    _props[prop] = props[prop]
  }

  return _props
})
const ariaLabel = computed(() => (props.title || (slots.title && getSlotChildrenText(slots.title())) || 'Card link').trim())
</script>

<template>
  <div
    ref="el"
    :style="{
      '--x': `${elementX}px`,
      '--y': `${elementY}px`,
    }"
    :class="ui.wrapper"
    v-bind="attrs"
  >
    <UCard :ui="ui">
      <div>
        <NuxtLink v-if="to" :aria-label="ariaLabel" v-bind="nuxtLinkProps" class="focus:outline-none" tabindex="-1">
          <span class="absolute inset-0" aria-hidden="true" />
        </NuxtLink>

        <div v-if="icon || $slots.icon" :class="ui.icon.wrapper">
          <slot name="icon">
            <UIcon :name="icon" :class="ui.icon.base" />
          </slot>
        </div>

        <p v-if="title || $slots.title" :class="ui.title">
          <slot name="title">
            {{ title }}
          </slot>
        </p>

        <p v-if="description || $slots.description" :class="ui.description">
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <slot v-if="$slots.default" />
    </UCard>
  </div>
</template>

<style scoped>
.background-gradient::before {
  background: radial-gradient(350px circle at var(--x) var(--y), rgb(var(--color-primary-DEFAULT)) 0%, transparent 100%);
  will-change: background;
}
</style>
