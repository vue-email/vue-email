# Image
Display an image in your email.

### Usage

```vue
<template>
  <e-img src="circle.png" alt="circle" width="300" height="300" />
</template>

<script setup>
import { EImg } from 'vue-email';
</script>
```

| Name     |  type  |         Description        |
| ----     | :---:  |  :-----------------------: |
|  `alt`   | string | Alternate description for an image |
| `src`    | string | The path to the image |
| `width`  | string | The width of an image in pixels  |
| `height` | string | The height of an image in pixels  |