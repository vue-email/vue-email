---
title: MailerSend
description: Learn how to send an email using Vue Email and MailerSend Node.js SDK.
links:
  - label: NPM
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/mailersend
---

## 1. Install dependencies

Get the [MailerSend Node.js SDK](https://www.npmjs.com/package/mailersend).

::code-group
```sh [pnpm]
pnpm add mailersend
```
```sh [yarn]
yarn add mailersend
```
```sh [npm]
npm install mailersend
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
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

const sentFrom = new Sender("you@yourdomain.com", "Your name");
const recipients = [
  new Recipient("your@client.com", "Your Client")
];


export default defineEventHandler(async (event) => {
  const template = await useCompiler('welcome.vue', {
    props: {
      url: 'https://vuemail.net/',
    }
  })

  const options = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("This is a Subject")
    .setHtml(template)


  await mailerSend.email.send(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { config } from "vue-email/compiler";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});
const sentFrom = new Sender("you@yourdomain.com", "Your name");
const recipients = [
  new Recipient("your@client.com", "Your Client")
];

const app = express();
const vueEmail = config("./emails");

app.use(express.json());

app.post('/api/send-email', async (req, res) => {

  const template = await vueEmail.render("welcome.vue", {
      props: {
        url: 'https://vuemail.net/',
      },
    });

  const options = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("This is a Subject")
    .setHtml(template)

  await mailerSend.email.send(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

::
