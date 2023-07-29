# Image
Display a divider that separates content areas in your email.

## Getting started

Add the component to your email template. Include styles where needed.




```vue
<template>
  <e-img src="cat.jpg" alt="Cat" width="300" height="300" />
</template>

<script setup>
import { EImg } from 'vue-email';
</script>
```
::: tip
All email clients can display `.png`, `.gif`, and `.jpg` images. Unfortunately, `.svg` images are not well supported, regardless of how they’re referenced, so avoid using these. See <u>[Can I Email](https://www.caniemail.com/features/image-svg/)</u> for more information.
:::

::: info
To have a global base URL for all images, set the `baseUrl` option in your Vue Email configuration. See <u>[Configuration](/getting-started/config)</u> for more information.
:::

### Props
| Name     |  type  |         Description        |
| ----     | :---:  |  :-----------------------: |
|  `alt`   | string | Alternate description for an image |
| `src`    | string | The path to the image |
| `width`  | string | The width of an image in pixels  |
| `height` | string | The height of an image in pixels  |