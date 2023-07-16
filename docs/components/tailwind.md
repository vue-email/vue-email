# Tailwind
A Vue component to wrap emails with Tailwind CSS.

## Getting started
Add the component to your email template. Include styles where needed.


```vue
<template>
  <e-button href="https://vuejs.org" style="color: #61dafb">Click</e-button>
</template>

<script setup>
import { EButton } from 'vue-email';
</script>
```

### Props

| Name     |  type  |                                                            Description                                                             |
| -------- | :----: | :--------------------------------------------------------------------------------------------------------------------------------: |
| `config` | object | Customize the default theme for your project with the available properties in [Tailwind docs](https://tailwindcss.com/docs/theme). |

::: info
Note: Most email clients are style-limited and some styles may not work.
:::

## Live example

[Tailwind Demo](https://vue-email-demo.vercel.app/)
