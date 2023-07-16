---
title: Nuxt Setup
description: Setup vue-email in your Nuxt project.
---

# Getting Started

This guide will walk you through the steps to get started with `vue-email` in a Nuxt project.

## Step 1: Install `vue-email`

::: code-group
  ```bash [pnpm]
  pnpm add -D vue-email
  ```
  ```bash [yarn]
  yarn add -D vue-email
  ```
  ```bash [npm]
  npm install -D vue-email
  ```
:::

## Step 2: Use `vue-email`

Add `vue-email` to your Nuxt configuration:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'vue-email/nuxt',
  ],
})
```


The components and composables are auto imported, so you can use them in your components.

