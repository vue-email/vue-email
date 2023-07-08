# Send email using Nodemailer
Learn how to send an email using Vue Email and Nodemailer.


## 1. Install dependencies

Get the [nodemailer](https://www.npmjs.com/package/nodemailer) package.

::: code-group
  ```bash [pnpm]
  pnpm add nodemailer
  ```
  ```bash [yarn]
  yarn add nodemailer
  ```
  ```bash [npm]
  npm install nodemailer
  ```
:::


## 2. Create an email using Vue

Start by building your email template in a `.vue` file.


```vue
// `welcome.vue`
<template>
  <e-html lang="en">
    <e-button :href="url">
      View on GitHub
    </e-button>
  </e-html>
</template>
<script lang="ts" setup>
import { EButton, EHtml } from 'vue-email';

defineProps<{ url: string }>();
</script>
```

## Step 3: Convert to HTML and send email

Import the email template you just built, convert into a HTML string, and use the Nodemailer SDK to send it.

::: code-group

```ts [Nuxt]
// server/api/send-email.post.ts

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

  await transporter.sendMail(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { template } = req.body;

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
    html: template,
  };

  await transporter.sendMail(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

:::

## Try it yourself

[Nodemailer example](https://github.com/Dave136/vue-email)