[![vue-email](https://github.com/Dave136/vue-email/blob/main/docs/public/social-preview.jpg?raw=true)](https://vue-email.vercel.app)

# 💌 vue-email

[![npm version](https://img.shields.io/npm/v/vue-email?color=3492a3&label=)](https://www.npmjs.com/package/vue-email)
[![npm version](https://img.shields.io/npm/dm/vue-email.svg?style=flat&colorA=18181B&colorB=3492a3&label=Downloads)](https://www.npmjs.com/package/vue-email)
[![npm version](https://img.shields.io/npm/l/vue-email.svg?style=flat&colorA=18181B&colorB=3492a3)](https://github.com/Dave136/vue-email/blob/main/LICENSE)

> Simple way to build email templates in vue.

- [✨ &nbsp;Release Notes](https://github.com/Dave136/vue-email/releases)
- [📖 &nbsp;Read the documentation](https://vue-email.vercel.app)
- [💚 &nbsp;Nuxt Module](https://nuxt.com/modules/vue-email)

## Features

- 🧩 Build email templates with Vue components
- 🛤️ [SSR support](https://vue-email.vercel.app/getting-started/ssr), Runs on the server and client
- 📨 [Integrates with many email providers](https://vue-email.vercel.app/integrations/nodemailer)
- 🧪 Tested against popular email clients
- 🎨 [Supports Tailwind CSS](https://vue-email.vercel.app/components/tailwind)
- 🚚 First-class support for Nuxt 3
- ✨ Written in TypeScript


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

## Advanced Usage - SSR

> [📖 Read the SSR documentation](https://vue-email.vercel.app/getting-started/ssr)

```js
import express from "express";
import { config } from "vue-email/compiler";

const app = express();

const vueEmail = config("./templates", {
  verbose: false,
  options: {
    baseUrl: "https://vue-email-demo.vercel.app/",
  },
});

app.get("/", async function (req, res) {
  const template = await vueEmail.render("WelcomeEmail.vue", {
    props: {
      name: "John Doe",
    },
  });
  res.send(template);
});

app.listen(3000);

```

## 💻 Development

1. Clone this repository
2. Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
3. Install dependencies using `pnpm install`

## Contributors

<a href="https://github.com/Dave136/vue-email/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Dave136/vue-email" />
</a>

## Repo Activity

<img width="100%" src="https://repobeats.axiom.co/api/embed/7b2dec4aa2ae80fa81831c28f9bb7cdc532960fa.svg" />


## 📝 Annotations

This project is inspired by [react-email](https://react.email/)

## License

This project is licensed under [MIT](./LICENSE)
