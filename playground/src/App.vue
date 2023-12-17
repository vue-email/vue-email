<script setup lang="ts">
import { onMounted, ref} from 'vue'
  import { useRender } from 'vue-email';
  import Test from './components/Test.vue';

  const email = ref('')
  onMounted(async ()=>{
    await useRender(Test, { props: { title: 'Some title' } }, {
    pretty: true,
  }).then((res) => {
    email.value = res.html
  })
  })


</script>

<template>
  <div>
    {{ email }}
  </div>
</template>

<style scoped>

</style>
