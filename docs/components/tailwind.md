# Tailwind
A Vue component to wrap emails with Tailwind CSS.

### Usage

Add the component around your email body content.

```vue
<template>
  <e-tailwind :config="tailwindConfig">
    <e-button href="https://example.com" class="bg-primary px-3 py-2 font-medium leading-4 text-white">Click me</e-button>
  </e-tailwind>
</template>

<script setup>
import { ETailwind, EButton } from 'vue-email';

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: '#007291',
      },
    },
  },
};
</script>
```

### Props

| Name     |  type  |                                                            Description                                                             |
| -------- | :----: | :--------------------------------------------------------------------------------------------------------------------------------: |
| `config` | object | Customize the default theme for your project with the available properties in [Tailwind docs](https://tailwindcss.com/docs/theme). |

::: info
Note: Most email clients are style-limited and some styles may not work.
:::
