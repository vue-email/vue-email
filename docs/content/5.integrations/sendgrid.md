---
title: SendGrid
description: Learn how to send an email using Vue Email and the SendGrid Node.js SDK.
links:
  - label: NPM
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@sendgrid/mail
---

## 1. Install dependencies

Get the [SendGrid Node.js SDK](https://www.npmjs.com/package/@sendgrid/mail).

::code-group
```sh [pnpm]
pnpm add @sendgrid/mail
```
```sh [yarn]
yarn add @sendgrid/mail
```
```sh [npm]
npm install @sendgrid/mail
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
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default defineEventHandler(async (event) => {
  const template = await useCompiler('welcome.vue', {
    props: {
      url: 'https://vuemail.net/',
    }
  })

  const options = {
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    html: template,
  };

  await sendgrid.send(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import sendgrid from '@sendgrid/mail';
import { config } from "vue-email/compiler";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const vueEmail = config("./emails");

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const template = await vueEmail.render("welcome.vue", {
      props: {
        url: 'https://vuemail.net/',
      },
    });

  const options = {
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    html: template,
  };

  await sendgrid.send(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

::
