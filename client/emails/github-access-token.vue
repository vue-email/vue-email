<template>
  <e-html>
    <e-head />
    <e-preview>A fine-grained personal access token has been added to your account</e-preview>
    <e-tailwind>
      <e-body class="bg-white text-[#24292e] font-sans">
        <e-container class="w-[480px] mx-auto my-0 pt-[20px] px-0 pb-[48px]">
          <e-img width="32" height="32" src="/github.png" />
          <e-text class="text-[24px] leading-[1.25]">
            <strong>@{{ username }}</strong
            >, a personal access was created on your account.
          </e-text>

          <e-section
            class="p-[24px] border border-solid border-[#dedede] rounded-[5px] text-center"
          >
            <e-text class="mr-0 mb-[10px] text-left">
              Hey <strong>{{ username }}</strong
              >!
            </e-text>
            <e-text class="mb-[10px] text-left">
              A fine-grained personal access token (<e-link>resend</e-link>) was recently added to
              your account.
            </e-text>

            <e-button
              class="text-[14px] bg-[#28a745] text-white leading-[1.5] rounded-[.5em] px-[1.5em] py-[0.75em]"
              >View your token</e-button
            >
          </e-section>
          <e-text class="text-center">
            <e-link class="text-[#0366d6] text-[12px]">Your security audit log</e-link> ・
            <e-link class="text-[#0366d6] text-[12px]">Contact support</e-link>
          </e-text>

          <e-text class="text-[#6a737d] text-[12px] text-center mt-[60px]">
            GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
          </e-text>
        </e-container>
      </e-body>
    </e-tailwind>
  </e-html>
</template>

<script lang="ts" setup>
import {
  EHead,
  EHtml,
  EText,
  EContainer,
  EPreview,
  EBody,
  ESection,
  EImg,
  ELink,
  EButton,
  ETailwind,
} from 'vue-email';

interface Props {
  username?: string;
}

withDefaults(defineProps<Props>(), {
  username: 'Dave136',
});
</script>
