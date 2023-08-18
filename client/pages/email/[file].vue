<script setup lang="ts">
const route = useRoute()

const { getEmail, template } = useEmail()
const { settings } = useTool()

onMounted(async () => {
  await getEmail(`${route.params.file}`)
})
</script>

<template>
  <Splitpanes v-if="template" :horizontal="settings.horizontalSplit" class="default-theme">
    <Pane min-size="5" max-size="90" size="50">
      <iframe class="w-full h-screen" :srcdoc="template.html" frameborder="0" width="100%" height="100%" />
    </Pane>
    <Pane min-size="5" max-size="90" size="50">
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
