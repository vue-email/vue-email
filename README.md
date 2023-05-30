<h1 align="center">
  <img src="./docs/assets/vue-email.svg" />
</h1>

<p align="center">
   Simple way to build email templates in vue
</p>

<div align="center">
  <img src="https://img.shields.io/npm/v/vue-email/latest.svg?style=flat&colorA=18181B&colorB=28CF8D" />
  <img src="https://img.shields.io/npm/dm/vue-email.svg?style=flat&colorA=18181B&colorB=28CF8D" />
  <img src="https://img.shields.io/npm/l/vue-email.svg?style=flat&colorA=18181B&colorB=28CF8D" />
</div>

<br />

<div align="center">
   <a href="https://vue-email.vercel.app/" target="_blank">Documentation</a>
   <span> | </span>
   <a href="https://github.com/dave136/vue-email">GitHub</a> 
</div>

# What is Vue email?
After see [react-email](https://github.com/resendlabs/react-email) and [svelte-email](https://github.com/carstenlebek/svelte-email), i took the decision to build the same idea but for vue 😀, there you can design email templates using vue3 and render them to HTML or simple text.

Now TailwindCSS its supported! You can see [here](https://vue-email.vercel.app/components/tailwind.html)

# Installation :sunglasses:

It's so simple as install the package in your project:

```bash title="npm"
npm install vue-email
```

```bash title="yarn"
yarn add vue-email
```

```bash title="pnpm"
pnpm install vue-email
```

# Getting started 💪
Vue Email provides you a series of components to build a email template

## 1. Creating a template

> This example is based on Nuxt 3 app 

`components/template-email.vue`

```html
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

## 2. Send email

This basic example uses [Nodemailer](https://nodemailer.com/about/) and [Nuxt 3](https://nuxt.com) to send email. You easily can use other email service provider.

> In this example i pass the template by params in a request.

`server/api/email.post.ts`

```ts
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.HOST || 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const options = {
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    html: body.template,
  };

  const info = await transporter.sendMail(options);

  return { messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) as string };
});
```

> You can see the full example [here](https://github.com/Dave136/vue-email/tree/main/examples/nodemailer)

# Documentation

You can see the documentation [here](https://vue-email.vercel.app/)

# Components

You can see the components, listed below:

- [Html](https://vue-email.vercel.app/components/html.html)
- [Head](https://vue-email.vercel.app/components/head.html)
- [Body](https://vue-email.vercel.app/components/body.html)
- [Button](https://vue-email.vercel.app/components/button.html)
- [Container](https://vue-email.vercel.app/components/container.html)
- [Font](https://vue-email.vercel.app/components/font.html)
- [Column](https://vue-email.vercel.app/components/column.html)
- [Section](https://vue-email.vercel.app/components/section.html)
- [Heading](https://vue-email.vercel.app/components/heading.html)
- [Hr](https://vue-email.vercel.app/components/hr.html)
- [Image](https://vue-email.vercel.app/components/image.html)
- [Link](https://vue-email.vercel.app/components/link.html)
- [Preview](https://vue-email.vercel.app/components/preview.html)
- [Row](https://vue-email.vercel.app/components/row.html)
- [Tailwind](https://vue-email.vercel.app/components/tailwind.html)
- [Text](https://vue-email.vercel.app/components/text.html)

# Integrations

Emails built with vue-email can be converted into HTML or plain text, and sent using any email service provider. You can see examples here:

- [Nodemailer](https://github.com/Dave136/vue-email/tree/main/examples/nodemailer)
- [Nuxt]()

## Roadmap

This a list of features to add in the future:

- [x] TailwindCSS support
- [x] Plugin for Nuxt 3
- [ ] i18n support

## Author

- David Arenas [@dave136](https://twitter.com/davejs4)

### Annotations 📝

This project is originally written in react ([react-email](https://github.com/resendlabs/react-email)) by:

- Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita))
- Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha))

### License

This project is licensed under [MIT](./LICENSE)