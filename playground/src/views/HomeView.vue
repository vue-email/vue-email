<template>
  <h2>Send email with nodemailer</h2>
  <input type="text" v-model="name" />
  <button @click="sendEmail">Send email</button>
</template>

<script lang="ts" setup>
import { useRender } from 'vue-email';
import WelcomeTemplate from '../components/emails/welcome.vue';

// props to pass to the template
const name = ref('Dave');

// send email function
const sendEmail = async () => {
  const template = await useRender(WelcomeTemplate, { name: name.value });
  // call your API endpoint to send the email
  console.log(template);

};
</script>
