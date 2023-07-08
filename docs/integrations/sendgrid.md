# Send email using SendGrid
Learn how to send an email using Vue Email and the SendGrid Node.js SDK.


## 1. Install dependencies

Get the [SendGrid Node.js SDK](https://www.npmjs.com/package/@sendgrid/mail).

::: code-group
  ```bash [pnpm]
  pnpm add @sendgrid/mail
  ```
  ```bash [yarn]
  yarn add @sendgrid/mail
  ```
  ```bash [npm]
  npm install @sendgrid/mail
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

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const options = {
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    html: body.template,
  };

  await sendgrid.send(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { template } = req.body;

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

:::

## Try it yourself

[Sendgrid example](https://github.com/Dave136/vue-email)