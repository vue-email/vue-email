<h1 align="center">
  <img src="https://raw.githubusercontent.com/Dave136/vue-email/9eccd7ebcad406dd4fd58840f6e226bca1dac968/docs/assets/nuxt-email.svg" />
</h1>

<!-- [![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href] -->

<p align="center">
  Simple way to build awesomes email templates in nuxt.
</p>

<div align="center">
  <img src="https://img.shields.io/npm/v/@vue-email/nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D" />
  <img src="https://img.shields.io/npm/dm/@vue-email/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D" />
  <img src="https://img.shields.io/npm/l/@vue-email/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D" />
  <img src="https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js" />
</div>

<br />

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
- [📖 &nbsp;Documentation](https://vue-email.vercel.app)

## Features

<!-- Highlight some of the features your module provide here -->
- 💫 &nbsp;Build emails based on vue3 components
- 💪 &nbsp;Render templates using a composable
- 💅 &nbsp;TailwindCSS support out the box

## Quick Setup

1. Add `vue-email` dependency to your project

```bash
# Using pnpm
pnpm add -D @vue-email/nuxt

# Using yarn
yarn add --dev @vue-email/nuxt

# Using npm
npm install --save-dev @vue-email/nuxt
```

2. Add `@vue-email/nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@vue-email/nuxt'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Run ESLint
npm run lint

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@vue-email/nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@vue-email/nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/@vue-email/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@vue-email/nuxt

[license-src]: https://img.shields.io/npm/l/@vue-email/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@vue-email/nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
