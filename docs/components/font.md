---
title: 'Font'
description: 'A Vue Font component to set your fonts.'
lastUpdated: true
layout: doc
---

# Font

Add the component to your email template. This applies your font to all tags inside your email.
Note, that not all email clients supports web fonts, this is why it is important to configure your `fallbackFontFamily`.
To view all email clients that supports web fonts [see](https://www.caniemail.com/features/css-at-font-face/)

### Usage

```vue
<template>
  <e-html lang="en">
    <e-head>
      <e-font
        font-family="Roboto"
        fallback-font-family="Verdana"
        :web-font="{
          url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2'
          format: 'woff2',
        }"
        font-weight="400"
        font-style="normal"
      />
    </e-head>
  </e-html>
</template>

<script setup>
import { EHtml, EHead, EFont } from 'vue-email';
</script>
```


### Props

| Name                 |      type       |                                                            Description                                                            |
| -------------------- | :-------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| `fontFamily`         |     string      |         The font family you want to use. If the webFont property is configured, this should contain the name of that font         |
| `fallbackFontFamily` |     string      | The fallback font family the system should you, if web fonts are not supported or the chosen font is not installed on the system. |
| `webFont`            |     object      |                                         The webFont the supported email client should use                                         |
| `fontWeight`         | number - string |                                                      The weight of the font                                                       |
| `fontStyle`          |     string      |                                                       The style of the font                                                       |
