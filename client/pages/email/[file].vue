<script setup lang="ts">
const route = useRoute()
const isDragging = ref(false)
const refreshTime = ref(Date.now())

const { getEmail, template } = useEmail()
const { settings } = useTool()

onMounted(async () => {
  await getEmail(`${route.params.file}`)
})

const slowRefreshSources = useDebounceFn(() => {
  refreshTime.value = Date.now()
}, 1000)
</script>

<template>
  <Splitpanes :horizontal="settings.horizontalSplit" class="default-theme" @resize="isDragging = true" @resized="isDragging = false" @resize="slowRefreshSources">
    <Pane min-size="20" size="50">
      <div class="w-full h-full">
        <iframe class="w-full" :class="[settings.horizontalSplit ? 'h-full' : 'h-screen']" :srcdoc="template.html" frameborder="0" width="'100%'" />
      </div>
    </Pane>
    <Pane min-size="20" size="50">
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
</style>
