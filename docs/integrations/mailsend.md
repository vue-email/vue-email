# Send email using MailerSend
Learn how to send an email using Vue Email and MailerSend Node.js SDK.


## 1. Install dependencies

Get the [MailerSend Node.js SDK](https://www.npmjs.com/package/mailersend).

::: code-group
  ```bash [pnpm]
  pnpm add mailersend
  ```
  ```bash [yarn]
  yarn add mailersend
  ```
  ```bash [npm]
  npm install mailersend
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

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

const sentFrom = new Sender("you@yourdomain.com", "Your name");
const recipients = [
  new Recipient("your@client.com", "Your Client")
];


export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setSubject("This is a Subject")
  .setHtml(body.template)


  await mailerSend.email.send(options);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

const sentFrom = new Sender("you@yourdomain.com", "Your name");
const recipients = [
  new Recipient("your@client.com", "Your Client")
];

const app = express();

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { template } = req.body;

  const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setSubject("This is a Subject")
  .setHtml(template)

  await mailerSend.email.send(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

:::

## Try it yourself

[MailSend example](https://github.com/Dave136/vue-email)