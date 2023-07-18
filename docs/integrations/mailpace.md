# Send email using MailPace
Learn how to send an email using Vue Email and the MailPace Node.js SDK.


## 1. Install dependencies

Get the [MailPace](https://www.npmjs.com/package/@mailpace/mailpace.js) packages.

::: code-group
  ```bash [pnpm]
  pnpm add @mailpace/mailpace.js
  ```
  ```bash [yarn]
  yarn add @mailpace/mailpace.js
  ```
  ```bash [npm]
  npm install @mailpace/mailpace.js
  ```
:::


## 2. Create an email using Vue

Start by building your email template in a `.vue` file.


```vue
// `welcome.vue`
<template>
  <e-html lang="fr">
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

Import the email template you just built and use the MailPace SDK to send it.

::: code-group

```ts [Nuxt 3]
// server/api/send-email.post.ts

import MailPace from '@mailpace/mailpace.js';

const client = new MailPace.DomainClient('API_TOKEN_HERE');

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const options = {
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    htmlbody: body.template,
  };

  await client.sendEmail.(options);
  return { message: 'Email sent' };
});
```


:::

## Try it yourself

[MailPace example](https://github.com/Dave136/vue-email)
