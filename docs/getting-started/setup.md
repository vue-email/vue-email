---
title: Setup
description: Setup vue-email in your project.
---

# Getting Started

This guide will walk you through the steps to get started with `vue-email`.

## Step 1: Install `vue-email`

::: code-group

```bash [pnpm]
pnpm add -D vue-email
```

```bash [yarn]
yarn add -D vue-email
```

```bash [npm]
npm install -D vue-email
```

:::

## Step 2: Create an email template

Create a new email template in wherever you want to have your templates, for this case, we can create a template folder called `emails` within the components folder, template will be called `welcome.vue`.

```vue
// `components/emails/welcome.vue`
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
        <e-text :style="paragraph"
          >A Vue component library for building responsive emails</e-text
        >
        <e-section :style="btnContainer">
          <e-button
            px="12"
            py="12"
            :style="button"
            href="https://github.com/Dave136/vue-email"
          >
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
import {
  EButton,
  EContainer,
  EHead,
  EHr,
  EHtml,
  EImg,
  EPreview,
  ESection,
  EText,
} from "vue-email";

defineProps<{ name: string }>();

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  width: "100%",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
  height: "6em",
  width: "6em",
};

const paragraph = {
  fontFamily,
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  fontFamily,
  backgroundColor: "#41b883",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  fontFamily,
  color: "#8898aa",
  fontSize: "12px",
};
</script>
```

## Step 3: Rendering the template

We can use the `render` function. The value is an object with the following properties:

- `component`: The component to render
- `props`: The props to pass to the component (optional)
- `options`: The options to pass to the component (optional)
  - `options.plainText`: Whether to render the plain text version (default: `false` for HTML)
  - `options.pretty`: Whether to pretty print the HTML output (default: `false`)

```vue
// `pages/index.vue`
<template>
  <h2>Send email with nodemailer</h2>
  <input type="text" v-model="name" />
  <button @click="sendEmail">Send email</button>
</template>

<script lang="ts" setup>
import { useRender } from "vue-email";
import WelcomeTemplate from "~/components/emails/welcome.vue";

// props to pass to the template
const name = ref("Dave");

// send email function
const sendEmail = async () => {
  const template = await useRender(WelcomeTemplate, { name: name.value });
  // call your API endpoint to send the email
  const data = await $fetch("/api/email", {
    method: "post",
    body: {
      template,
    },
  });
};
</script>
```

## Step 4: Send email

Check the integrations section to see how to send emails with different providers.
