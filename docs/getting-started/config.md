---
title: Config Vue Email
description: Configure vue-email in your project.
---

# Configuration

This guide will walk you through the steps to configure `vue-email`.

## Options

VueEmail can be configured by passing an object to the `VueEmail` plugin. The following options are available:

| Name     |  type  |         Description        |
| -------- | :----: | :------------------------: |
| baseUrl  | string | The base URL of your site, used for images. |


## Example

::: code-group

```ts [Vue 3]
import { VueEmailPlugin } from 'vue-email'

const app = createApp(App)

app.use(VueEmailPlugin, {
    baseUrl: 'http://example.com',
})

app.mount('#app')

```

```ts [Nuxt 3]
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'vue-email/nuxt',
  ],
  // vue-email options
  vueEmail: {
    baseUrl: 'http://example.com',
  },
})
```

:::