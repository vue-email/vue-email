<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    count: Number,
    required: true,
  },
  setup(props) {
    const double = computed(() => props.count * 2)

    return { double }
  }
})
</script>

<template>
  <section>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
  </section>
</template>

