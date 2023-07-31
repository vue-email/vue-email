<script setup lang="ts">
interface Props {
  name: string
  default?: string
  required?: boolean
  description: string
  type: string
}

defineProps<{
  meta: Props[]
}>()
</script>

<template>
  <div>
    <FieldGroup>
      <Field v-for="prop in meta" :key="prop.name" v-bind="prop"></Field>
    </FieldGroup>
  </div>
</template>
