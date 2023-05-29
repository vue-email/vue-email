<template>
  <h2>Send email with nodemailer</h2>
  <button class="btn" @click="handleClick">Sent email</button>
  <div v-if="messageId.length && previewUrl.length">
    <p>Email sent:</p>
    <p>MessageId: {{ messageId }}</p>
    <p>previewUrl: <a :href="previewUrl">Visit here</a></p>
  </div>

  <button class="btn" :class="[seeTemplate && 'active']" @click="seeTemplate = !seeTemplate">
    See template component
  </button>

  <div v-if="seeTemplate">
    <welcome-template first-name="Dave13" message="This is my custom message" />
  </div>
</template>

<script lang="ts" setup>
import { render } from 'vue-email';
import WelcomeTemplate from '../templates/welcome.vue';
const messageId = ref('');
const previewUrl = ref('');
const seeTemplate = ref(false);

const handleClick = async () => {
  const template = await render(WelcomeTemplate, {
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

<style scoped>
.btn {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background: #1aaa56;
  border-radius: 0.3rem;
  color: #f2f2f2;
  margin-right: 0.5rem;
}

.btn:first-of-type {
  background-color: rgb(0, 85, 165);
}

.active {
  background: #037030;
}
</style>
