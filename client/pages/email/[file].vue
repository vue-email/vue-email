<script setup lang="ts">
import { slowRefreshSources } from '~/util/logic'

const route = useRoute()

const { emails, getEmail, email, template } = useEmail()

await getEmail(`${route.params.file}`)
</script>

<template>
  <Splitpanes class="default-theme" @resize="slowRefreshSources">
    <Pane size="50">
      <iframe class="w-full h-screen overflow-auto" :srcdoc="template.html" frameborder="0" width="'100%'" />
    </Pane>
    <Pane size="50">
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
  background-color: transparent !important;
  border-left: 1px solid rgba(156, 163, 175, 0.05);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0));
}
.dark .splitpanes.default-theme .splitpanes__splitter:before,
.splitpanes.default-theme .splitpanes__splitter:after {
  background-color: rgba(156, 163, 175, 0.3) !important;
}
</style>
