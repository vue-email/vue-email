# Send email using AWS SES
Learn how to send an email using Vue Email and the AWS SES Node.js SDK.


## 1. Install dependencies

Get the [AWS SES Node.js SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ses/).

::: code-group
  ```bash [pnpm]
  pnpm add @aws-sdk/client-ses
  ```
  ```bash [yarn]
  yarn add @aws-sdk/client-ses
  ```
  ```bash [npm]
  npm install @aws-sdk/client-ses
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

import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: process.env.AWS_SES_REGION })

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const params = {
    Source: 'you@example.com',
    Destination: {
      ToAddresses: ['user@gmail.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body.template,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'hello world',
      },
    },
  };

  await ses.sendEmail(params);
  return { message: 'Email sent' };
});
```

```ts [NodeJs]
import express from 'express';
import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: process.env.AWS_SES_REGION })

const app = express();

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { template } = req.body;

  const params = {
    Source: 'you@example.com',
    Destination: {
      ToAddresses: ['user@gmail.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: template,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'hello world',
      },
    },
  };

  await ses.sendEmail(options);

  return res.json({ message: "Email sent" });
});

app.listen(3001);
```

:::

## Try it yourself

[AWS SES example](https://github.com/Dave136/vue-email)