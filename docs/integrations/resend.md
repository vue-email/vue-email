# Send email using Resend
Learn how to send an email using Vue Email and the Resend Node.js SDK.


## 1. Install dependencies

Get the [resend](https://www.npmjs.com/package/resend) packages.

::: code-group
  ```bash [pnpm]
  pnpm add resend
  ```
  ```bash [yarn]
  yarn add resend
  ```
  ```bash [npm]
  npm install resend
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

Import the email template you just built and use the Resend SDK to send it.

::: code-group

```ts [Nuxt]
// server/api/send-email.post.ts

import { Resend } from 'resend';

const resend = new Resend('re_123456789');

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const options = {
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    html: body.template,
  };

  await resend.emails.send(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import { Resend } from 'resend';

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

  await resend.emails.send(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

:::

## Try it yourself

[Resend example](https://github.com/Dave136/vue-email)