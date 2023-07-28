# Button
A link that is styled to look like a button.

::: info
Semantics: Quite often in the email world we talk about buttons, when actually we mean links. Behind the scenes this is a `<a>` tag, that is styled like a `<button>` tag.
:::

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

| Name |  type  |  default  |Required  |        Description        |
| ---- | :---:  |  :--: | :---:   | :-----------------------: |
| `href` | string |  - |   true    | Link to be triggered when the button is clicked |
| `target` | string | _blank |     false    | Specify the target attribute for the button link |
