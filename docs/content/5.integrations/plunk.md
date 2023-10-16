---
title: Plunk
description: Learn how to send an email using Vue Email and Plunk Node.js SDK.
links:
  - label: NPM
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@plunk/node
---

## 1. Install dependencies

Get the [Plunk Node.js SDK](https://www.npmjs.com/package/@plunk/node).

::code-group
```sh [pnpm]
pnpm add @plunk/node
```
```sh [yarn]
yarn add @plunk/node
```
```sh [npm]
npm install @plunk/node
```
::

## 2. Create an email using Vue

Start by building your email template in a `.vue` file.


```vue [emails/welcome.vue]
<script lang="ts" setup>
defineProps<{ url: string }>();
</script>

<template>
  <e-html lang="en">
    <e-button :href="url">
      View on GitHub
    </e-button>
  </e-html>
</template>
```

## Step 3: Convert to HTML and send email

Import the email template you just built, convert into a HTML string, and use the Nodemailer SDK to send it.

::code-group

```ts [Nuxt 3]
// server/api/send-email.post.ts
import { useCompiler } from '#vue-email'
import Plunk from '@plunk/node';

const plunk = new Plunk(process.env.PLUNK_API_KEY);

export default defineEventHandler(async (event) => {
  const template = await useCompiler('welcome.vue', {
    props: {
      url: 'https://vuemail.net/',
    }
  })

  await plunk.emails.send({
    to: "hello@useplunk.com",
    subject: "Hello world",
    body: template,
  });

  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import Plunk from '@plunk/node';
import { config } from "vue-email/compiler";

const plunk = new Plunk(process.env.PLUNK_API_KEY);

const app = express();
const vueEmail = config("./emails");

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const template = await vueEmail.render("welcome.vue", {
      props: {
        url: 'https://vuemail.net/',
      },
    });

  await plunk.emails.send({
    to: "hello@useplunk.com",
    subject: "Hello world",
    body: template,
  });

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

::
