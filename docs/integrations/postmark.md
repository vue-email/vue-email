# Send email using Postmark
Learn how to send an email using Vue Email and the Postmark Node.js SDK.


## 1. Install dependencies

Get the [Postmark Node.js SDK](https://www.npmjs.com/package/postmark).

::: code-group
  ```bash [pnpm]
  pnpm add postmark
  ```
  ```bash [yarn]
  yarn add postmark
  ```
  ```bash [npm]
  npm install postmark
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

```ts [Nuxt 3]
// server/api/send-email.post.ts

import postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const options = {
    From: 'you@example.com',
    To: 'user@gmail.com',
    Subject: 'hello world',
    HtmlBody: body.template,
  };

  await client.sendEmail(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

const app = express();

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { template } = req.body;

  const options = {
    From: 'you@example.com',
    To: 'user@gmail.com',
    Subject: 'hello world',
    HtmlBody: template,
  };

  await client.sendEmail(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

:::

## Try it yourself

[Postmark example](https://github.com/Dave136/vue-email)