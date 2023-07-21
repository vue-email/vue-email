<script setup lang="ts">
const icons = [
  'heroicons:chevron-up-down',
  'mdi:account-circle',
  'tabler:3d-rotate',
  'solar:adhesive-plaster-2-outline',
  'ph:address-book-thin',
  'ph:apple-logo-light',
  'twemoji:astronaut-light-skin-tone',
]
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview> Markdown email preview </EPreview>
    <EBody>
      <EContainer>
        <ESection>
          <EIcon v-for="icon in icons" :key="icon" :name="icon" />
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
