# Button
A link that is styled to look like a button.

### Usage

```vue
<template>
  <e-button href="https://vuejs.org" style="color: #61dafb">Click</e-button>
</template>

<script setup>
import { EButton } from 'vue-email';
</script>
```

| Name |  type  |  default  |Required  |        Description        |
| ---- | :---:  |  :--: | :---:   | :-----------------------: |
| `href` | string |  - |   true    | Link to be triggered when the button is clicked |
| `target` | string | _blank |     false    | Specify the target attribute for the button link |
