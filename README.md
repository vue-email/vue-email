[![vue-email](https://github.com/Dave136/vue-email/blob/main/docs/public/social-preview.jpg?raw=true)](https://vuemail.net)

# 💌 vue-email

[![npm version](https://img.shields.io/npm/v/vue-email?color=3492a3&label=)](https://www.npmjs.com/package/vue-email)
[![npm downloads](https://img.shields.io/npm/dm/vue-email.svg?style=flat&colorA=18181B&colorB=3492a3&label=Downloads)](https://www.npmjs.com/package/vue-email)
[![license](https://img.shields.io/npm/l/vue-email.svg?style=flat&colorA=18181B&colorB=3492a3)](https://github.com/Dave136/vue-email/blob/main/LICENSE)
[![docs](https://img.shields.io/badge/Vue_Email%20Docs-18181B?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzYgMzYiPjxwYXRoIGZpbGw9IiM1NUFDRUUiIGQ9Ik03IDEyYTEgMSAwIDAgMS0xIDFIMWExIDEgMCAwIDEgMC0yaDVhMSAxIDAgMCAxIDEgMW0tMiA1YTEgMSAwIDAgMS0xIDFIMWExIDEgMCAwIDEgMC0yaDNhMSAxIDAgMCAxIDEgMW0tMiA1YTEgMSAwIDAgMS0xIDFIMWExIDEgMCAxIDEgMC0yaDFhMSAxIDAgMCAxIDEgMSIvPjxwYXRoIGZpbGw9IiNDQ0Q2REQiIGQ9Ik0zMi4zMDEgMjVjLS42MjYgMi4yMDktMi45MjUgNC01LjEzNCA0aC0yMGMtMi4yMDkgMC0zLjQ5Mi0xLjc5MS0yLjg2Ni00bDMuMzk4LTEyYy42MjYtMi4yMDkgMi45MjQtNCA1LjEzMy00aDIwYzIuMjA5IDAgMy40OTMgMS43OTEgMi44NjcgNGwtMy4zOTggMTJ6Ii8+PHBhdGggZmlsbD0iIzk5QUFCNSIgZD0iTTE3LjMzNiAxNy42MzZMNC4zODQgMjYuOTQ5Yy0uMDM0LjAyOC0uMDU0LjA2My0uMDg1LjA5MWEyLjY2IDIuNjYgMCAwIDAgLjk5MiAxLjM4NGMuMDM1LS4wMjMuMDczLS4wMzMuMTA3LS4wNkwxOC4zNSAxOS4wNWMuNTAxLS4zOTEuNjgxLTEuMDIzLjQwMS0xLjQxNGMtLjI4MS0uMzkxLS45MTMtLjM5MS0xLjQxNSAwbTEzLjgxIDkuNDA0Yy0uMDE1LS4wMjgtLjAxNi0uMDYzLS4wMzQtLjA5bC03LjY3NC05LjMxNGMtLjI4MS0uMzkxLS45MTMtLjM5MS0xLjQxNiAwYy0uNTAxLjM5MS0uNjggMS4wMjMtLjQgMS40MTRsNy42NzYgOS4zMTRjLjAxOC4wMjYuMDUxLjAzNy4wNzIuMDZhNi4wNCA2LjA0IDAgMCAwIDEuNzc2LTEuMzg0Ii8+PHBhdGggZmlsbD0iIzk5QUFCNSIgZD0iTTM1LjY5OSAxM2MuNjI2LTIuMjA5LS42NTgtNC0yLjg2Ny00aC0yMGMtMi4yMDkgMC00LjUwNyAxLjc5MS01LjEzMyA0bC0uMDIxLjA3NGw4LjgwNiA4LjQ1MmMxLjYzMSAxLjU4NCAzLjc4OCAxLjQ3NSA1LjcyNS4zNzFsMTMuMjI3LTcuOTY0bC4yNjMtLjkzM3oiLz48cGF0aCBmaWxsPSIjRTFFOEVEIiBkPSJNMzIuODMyIDloLTIwYy0xLjU3OCAwLTMuMTg5LjkyMS00LjIxNyAyLjI0OGw5LjIxNyA4Ljc5NGMuNzQ5LjcxOSAyLjQzNC43MjkgMy42NTYgMGwxNC4yOTQtOC43NjhDMzUuNTE2IDkuOTMzIDM0LjQyIDkgMzIuODMyIDl6Ii8+PC9zdmc+)](https://www.vuemail.net/getting-started)


> Simple way to build email templates in vue.

- [✨ &nbsp;Release Notes](https://github.com/Dave136/vue-email/releases)
- [📖 &nbsp;Read the documentation](https://vuemail.net)
- [💚 &nbsp;Nuxt Module](https://nuxt.com/modules/vue-email)

> [!IMPORTANT]  
> Experimental and under heavy development. APIs are subject to change.

## Features

- 🧩 Build email templates with Vue components
- 🛤️ [SSR support](https://vuemail.net/getting-started/ssr), preview/send emails both on server and client.
- 🌍 [i18n support](https://vuemail.net/getting-started/i18n)
- 📨 [Integrates with many email providers](https://vuemail.net/integrations/nodemailer)
- 🧪 Tested against popular email clients
- 🎨 [Supports Tailwind CSS](https://vuemail.net/components/tailwind)
- 🚚 First-class support for Nuxt 3
- ✨ Written in TypeScript


## Setup

> [📖 Read the documentation](https://vuemail.net)

```bash
# pnpm
pnpm add -D vue-email

# npm
npm i -D vue-email
```

## Basic Usage

> [📖 Read the documentation](https://vuemail.net)

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

> [📖 Read the SSR documentation](https://vuemail.net/getting-started/ssr)

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

## 🛟 Support
If you like our work, please feel to free to support us!

- BTC: `1Bwo1Htd47rLRM4PZhydWtoC5ZAR4Fv9KZ`
- USDT: [binance-qr](https://github.com/Dave136/vue-email/blob/main/docs/public/binance-qr.png?raw=true)
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
