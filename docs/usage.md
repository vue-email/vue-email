---
title: 'Usage'
description: 'Use vue-email'
---

# Usage

### Creating email templates

Create a new email template in wherever you want to have your templates, for this case, due the example is with [Nuxt 3](https://nuxt.com):

`src/components/welcome-template.vue`

```vue
<template>
  <e-html lang="en">
    <e-head />
    <e-preview preview="Welcome to vue-email" />
    <e-section :style="main">
      <e-container :style="container">
        <e-img
          src="https://avatars.githubusercontent.com/u/6128107?s=200&v=4"
          alt="Vue logo"
          :style="logo"
          width="200"
          height="50"
        />
        <e-text :style="paragraph">{{ firstName }}, welcome to vue-email</e-text>
        <e-text :style="paragraph"> A Vue component library for building responsive emails </e-text>
        <e-section :style="btnContainer">
          <e-button :p-x="12" :p-y="12" :style="button" href="https://github.com/Dave136/vue-email">
            View on GitHub
          </e-button>
        </e-section>
        <e-text :style="paragraph">Happy coding!</e-text>
        <e-hr :style="hr" />
        <e-text :style="footer"> David Arenas </e-text>
      </e-container>
    </e-section>
  </e-html>
</template>
<script lang="ts" setup>
import { EButton, EContainer, EHead, EHr, EHtml, EImg, EPreview, ESection, EText } from 'vue-email';

const firstName = ref('Dave');

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  width: '100%',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
  height: '6em',
  width: '6em',
};

const paragraph = {
  fontFamily,
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  fontFamily,
  backgroundColor: '#41b883',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  fontFamily,
  color: '#8898aa',
  fontSize: '12px',
};
</script>

```

### Rendering the templates

We can use the `render` function, and pass in the body of request.

> Passing the template in the body, give us the chance of rendering using any server, express, fastify, nuxt in SSR, etc.

`src/pages/index.vue`

```vue
<template>
  <h2>Send email with nodemailer</h2>
  <button @click="handleClick">Sent email</button>
</template>

<script lang="ts" setup>
import { render } from 'vue-email';
import WelcomeTemplate from '~/components/welcome-template.vue';

const handleClick = async () => {
  const template = await render(WelcomeTemplate);
  const data = await $fetch('/api/email', {
    method: 'post',
    body: {
      template,
    },
  });
};
</script>

```

`src/server/api/email.post.ts`

```ts
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
});

```