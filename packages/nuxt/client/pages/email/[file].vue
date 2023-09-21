<script setup lang="ts">
const route = useRoute()

const { getEmail, template } = useEmail()
const { horizontalSplit, previewMode } = useTool({
  async onReload() {
    await getEmail(`${route.params.file}`)
  },
})

onMounted(async () => {
  await getEmail(`${route.params.file}`)
})

const showBoth = computed(() => previewMode.value.id === 'both')
const showCode = computed(() => previewMode.value.id === 'code' || previewMode.value.id === 'both')
const showIframe = computed(() => previewMode.value.id === 'iframe' || previewMode.value.id === 'both')
</script>

<template>
  <Splitpanes v-if="template" :horizontal="horizontalSplit" class="default-theme">
    <Pane v-if="showIframe" min-size="5" :max-size="showBoth ? 90 : 100" :size="showBoth ? 50 : 100">
      <iframe class="w-full h-screen" :srcdoc="template.html" frameborder="0" width="100%" height="100%" />
    </Pane>
    <Pane v-if="showCode" min-size="5" :max-size="showBoth ? 90 : 100" :size="showBoth ? 50 : 100">
      <CodeContainer />
    </Pane>
  </Splitpanes>
</template>

<style>
.tab-panels {
  width: 100%;
}
div[role='tabpanel'] {
  width: 100%;
  display: flex;
}
.splitpanes.default-theme .splitpanes__pane {
  background-color: transparent !important;
}
.dark .splitpanes.default-theme .splitpanes__splitter {
  background-color: #646464 !important;
  border-left: 1px solid #a9a9a9;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0));
}
.dark .splitpanes.default-theme .splitpanes__splitter:before,
.splitpanes.default-theme .splitpanes__splitter:after {
  background-color: white !important;
}

.splitpanes.default-theme.splitpanes--dragging iframe {
  pointer-events: none;
}
</style>
