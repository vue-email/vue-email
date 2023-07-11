<script setup lang="ts">
useHead({
  title: 'Vue Email',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="max-w-md border border-slate-6 rounded-md p-8">
      <h2 class="text-base text-slate-12 font-medium">
        Welcome to the Vue Email preview!
      </h2>
      <p class="mt-2 mb-4 text-sm text-slate-11 font-normal">
        To start developing your next email template, you can create a
        <code>.vue</code> file under the "emails" folder.
      </p>
      <UButton
        to="https://vue-email.vercel.app/"
        color="black"
        target="_blank"
        label="Check the docs"
        icon="i-ph-graduation-cap"
      />
    </div>
  </div>
</template>
