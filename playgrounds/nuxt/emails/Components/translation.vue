<script setup>
defineProps({
  username: {
    type: String,
    default: 'John',
  },
})
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Translation email preview</EPreview>
    <EBody>
      <EContainer>
        <ESection>
          <EText>{{ $t('message', { user: username }) }}</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
