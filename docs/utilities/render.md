# Render
This utility function transform vue components into HTML email templates.

### Create an email using vue
You can start building your email template in a `.vue` file.

```vue
<template>
  <e-html lang="en">
    <e-text>{{ title }}</e-text>
    <e-hr />
    <e-button>Click me</e-button>
  </e-html>
</template>

<script setup>
import { EHtml, EText, EHr, EButton } from 'vue-email';
defineProps({
  title: String,
});
</script>
```

### Convert to HTML
Import an existing Vue component and convert into a HTML string.

```vue
<script setup>
  import { render } from 'vue-email';
  import template from '~/components/template.vue';

  const html = await render(template, { title: 'My template' });

  console.log(html);
</script>
```

<!-- This will generate the following output: -->


### Convert to Plain Text
Plain text versions of emails are important because they ensure that the message can be read by the recipient even if they are unable to view the HTML version of the email.

This is important because not all email clients and devices can display HTML email, and some recipients may have chosen to disable HTML email for security or accessibility reasons.

Here’s how to convert a React component into plain text.

```vue
<script setup>
  import { render } from 'vue-email';
  import template from '~/components/template.vue';

  const text = await render(template, null, {
    plainText: true,
  });

  console.log(text);
</script>
```

This will generate the following output:

```text
Some title

---

Click me [https://example.com]
```


#### Options

| Name       |  type   |         Description        |
| ----       | :----:  |  :-----------------------: |
| `pretty`   | boolean |  Beautify HTML output      |
| `planText` | boolean |  Generate plain text version |
