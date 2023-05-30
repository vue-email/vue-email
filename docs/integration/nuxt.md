---
title: VueEmail Nuxt Module
description: Nuxt module for VueEmail.
---

# Nuxt Module

The nuxt module for VueEmail.

## Installation

::: code-group
```bash [npm]
npm install -D @vue-email/nuxt
```
```bash [yarn]
yarn add -D @vue-email/nuxt
```
```bash [pnpm]
pnpm add -D @vue-email/nuxt
```
:::

Add `@vue-email/nuxt` to your Nuxt config file:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vue-email/nuxt',
  ],
})
```

The components be automatically injected by the module and a special composable to render component.

## License

- MIT License &copy; 2023-PRESENT [David Arenas](https://github.com/Dave136)