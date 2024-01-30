<script setup lang="ts">
import { EBody, ECodeBlock, EContainer, EHead, EHtml, EPreview, ESection, ETailwind, EText } from 'vue-email'

const code1 = `<template>
<div>
  <h2>Child</h2>
  <slot name="top" />
  <slot name="bottom" />
</div>
</template>`
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <title>Title</title>
      <EPreview>Preview</EPreview>
      <EBody class="mx-auto my-auto w-full bg-white font-sans">
        <EContainer
          class="mx-auto my-[40px] w-full max-w-[650px] p-[20px] md:p-7"
        >
          <ESection>
            <ECodeBlock :code="code1" lang="vue" theme="poimandres" />
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
