<template>
  <h2>Send email with nodemailer</h2>
  <button @click="handleClick">Sent email</button>
  <div v-if="messageId.length && previewUrl.length">
    <p>Email sent:</p>
    <p>MessageId: {{ messageId }}</p>
    <p>previewUrl: <a :href="previewUrl">Visit here</a></p>
  </div>

  <button @click="seeTemplate = !seeTemplate">See template component</button>

  <div v-if="seeTemplate">
    <welcome-template-with-props first-name="Dave13" message="This is my custom message" />
  </div>
</template>

<script lang="ts" setup>
import { renderComponent } from 'vue-email';
import WelcomeTemplateWithProps from '../components/welcome-template-with-props.vue';
const messageId = ref('');
const previewUrl = ref('');
const seeTemplate = ref(false);

const handleClick = async () => {
  const template = await renderComponent(WelcomeTemplateWithProps, {
    firstName: 'Dave13',
    message: 'This is my custom message',
  });
  const data = await $fetch('/api/email', {
    method: 'post',
    body: {
      template,
    },
  });
  messageId.value = data.messageId;
  previewUrl.value = data.previewUrl;
};
</script>
