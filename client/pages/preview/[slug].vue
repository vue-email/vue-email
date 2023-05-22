<template>
  <preview
    :slug="$route.params.slug"
    :markup="markup"
    :plain-text="plainText"
    :vue-markup="vueMarkup"
  />
</template>

<script lang="ts" setup>
import { render } from 'vue-email';

const { data } = await useFetch('/api/emails');

const route = useRoute();

const template = data.value?.filenames.filter((email) => {
  const [filename] = email.split('.');
  return route.params.slug === filename;
});

const email = (await import(`../../emails/${route.params.slug}.vue`)).default;

const markup = await render(email, null, { pretty: true });
const plainText = await render(email, null, { plainText: true });

const { data: vueMarkup } = await useFetch('/api/markup', {
  method: 'post',
  body: {
    name: template[0],
  },
});
</script>
