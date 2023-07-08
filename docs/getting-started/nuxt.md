---
title: vue-email Nuxt Module
description: Nuxt module for vue-email.
---

# Getting Started

This guide will walk you through the steps to get started with `vue-email` in a Nuxt project.

## Step 1: Install `@vue-email/nuxt`

::: code-group
  ```bash [pnpm]
  pnpm add -D @vue-email/nuxt
  ```
  ```bash [yarn]
  yarn add -D @vue-email/nuxt
  ```
  ```bash [npm]
  npm install -D @vue-email/nuxt
  ```
:::

## Step 2: Use `@vue-email/nuxt`

Add `@vue-email/nuxt` to your Nuxt configuration:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vue-email/nuxt',
  ],
})
```


The components be automatically injected by the module and a special composable to render component.

------------

# `useRender`

This utility function transform vue components into HTML email templates. and the composable gives access to the actual `render` function, mentioned [`here`](/utilities/render)