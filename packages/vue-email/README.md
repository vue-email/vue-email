[![vue-email](https://github.com/Dave136/vue-email/blob/main/docs/public/og.png?raw=true)](https://vue-email.vercel.app)

# vue-email

[![npm version](https://img.shields.io/npm/v/vue-email?color=3492a3&label=)](https://www.npmjs.com/package/vue-email)
[![npm version](https://img.shields.io/npm/dm/vue-email.svg?style=flat&colorA=18181B&colorB=3492a3&label=Downloads)](https://www.npmjs.com/package/vue-email)
[![npm version](https://img.shields.io/npm/l/vue-email.svg?style=flat&colorA=18181B&colorB=3492a3)](https://github.com/Dave136/vue-email/blob/main/LICENSE)

> Simple way to build email templates in vue.

- [✨ &nbsp;Release Notes](https://github.com/Dave136/vue-email/releases)
- [📖 &nbsp;Read the documentation](https://vue-email.vercel.app)

## Features

- 🧩 Build email templates with Vue components
- 📨 [Integrates with many email providers](https://vue-email.vercel.app/integrations/nodemailer.html)
- 🧪 Tested against popular email clients
- 🎨 [Supports Tailwind CSS](https://vue-email.vercel.app/components/tailwind.html)

## Setup

> [📖 Read the documentation](https://vue-email.vercel.app)

```bash
# pnpm
pnpm add -D vue-email

# npm
npm i -D vue-email
```

## Basic Usage

> [📖 Read the documentation](https://vue-email.vercel.app)

```html
// components/template-email.vue
<template>
   <e-html lang="en">
      <e-text>Hello, {{ user }}!</e-text>
      <e-hr />
      <e-button href="vuejs.org">Visit vue</e-button>
   </e-html>
</template>

<script setup>
import { EButton, EHr, EHtml, EText } from 'vue-email';
import { ref } from 'vue';
   
const user = ref('Dave');
</script>
```
> You can see the full example [here](https://github.com/Dave136/vue-email/getting-started/setup.html)

## 💻 Development

1. Clone this repository
2. Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
3. Install dependencies using `pnpm install`

## 📝 Annotations

This project is originally written in react ([react-email](https://github.com/resendlabs/react-email)) by:

- Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita))
- Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha))

## License

This project is licensed under [MIT](./LICENSE)
