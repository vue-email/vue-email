---
title: 'Usage'
description: 'Use vue-email'
---

# Usage

### Creating email template

Create a new email template in wherever you want to have your templates, for this case, we can create a template folder, with a template called `welcome.vue`.

`src/templates/welcome.vue`

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
        <e-text :style="paragraph">{{ name }}, welcome to vue-email</e-text>
        <e-text :style="paragraph">A Vue component library for building responsive emails</e-text>
        <e-section :style="btnContainer">
          <e-button :px="12" :py="12" :style="button" href="https://github.com/Dave136/vue-email">
            View on GitHub
          </e-button>
        </e-section>
        <e-text :style="paragraph">Happy coding!</e-text>
        <e-hr :style="hr" />
        <e-text :style="footer">David Arenas</e-text>
      </e-container>
    </e-section>
  </e-html>
</template>
<script lang="ts" setup>
import { EButton, EContainer, EHead, EHr, EHtml, EImg, EPreview, ESection, EText } from 'vue-email';

defineProps<{ name: string }>();

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

We can use the `render` function, it receives two params, the first one is the template to render, and the second the params to be used for the template, and then pass the result template in the body of request.

> Passing the template in the body, give us the chance of rendering using any server, express, fastify, nuxt in SSR, etc.

`src/pages/index.vue`

```vue
<template>
  <h2>Send email with nodemailer</h2>
  <input type="text" v-model="name" />
  <button @click="handleClick">Sent email</button>
</template>

<script lang="ts" setup>
import { render } from 'vue-email';
import WelcomeTemplate from '~/templates/welcome.vue';

const name = ref('Dave');

const handleClick = async () => {
  const template = await render(WelcomeTemplate, { name });
  const data = await $fetch('/api/email', {
    method: 'post',
    body: {
      template,
    },
  });
};
</script>

```


### Send email

In this example i using `nuxt v3` because it allows us to set api inside own project, and define multiple api routes.

Here we just extract the template of the request body, and send the email passing the template in the `sendMail` function of the `nodemailer` package.

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

If you are not using the server in nuxt, you can easily implement on any framework for example using express:

```ts
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
