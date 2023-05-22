<template>
  <e-html>
    <e-head />
    <e-preview>Log in with this magic link.</e-preview>
    <e-body
      style="
        background-color: #fff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
          Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      "
    >
      <e-container
        style="
          margin: 0 auto;
          padding: 20px 25px 48px;
          background-image: url(/raycast-bg.png);
          background-position: bottom;
          background-repeat: no-repeat, no-repeat;
        "
      >
        <e-img src="/raycast-logo.png" width="48" height="48" alt="Raycast" />
        <e-heading style="font-size: 28px; font-weight: bold; margin-top: 48px"
          >🪄 Your magic link</e-heading
        >
        <e-section style="margin: 24px 0">
          <e-text style="font-size: 16px; line-height: 26px">
            <e-link style="color: #ff6363" :href="magicLink"> 👉 Click here to sign in 👈 </e-link>
          </e-text>
          <e-text style="font-size: 16px; line-height: 26px">
            If you didn't request this, please ignore this email.
          </e-text>
        </e-section>
        <e-text style="font-size: 16px; line-height: 26px">
          Best,
          <br />- Raycast Team
        </e-text>
        <e-hr style="border-color: #dddddd; margin-top: 48px" />
        <e-img
          src="/raycast-logo.png"
          width="32"
          height="32"
          style="-webkit-filter: grayscale(100%); filter: grayscale(100%); margin: 20px 0"
        />
        <e-text style="color: #8898aa; font-size: 12px; margin-left: 4px"
          >Raycast Technologies Inc.</e-text
        >
        <e-text style="color: #8898aa; font-size: 12px; margin-left: 4px">
          2093 Philadelphia Pike #3222, Claymont, DE 19703
        </e-text>
      </e-container>
    </e-body>
  </e-html>
</template>

<script lang="ts" setup>
import {
  EHead,
  EHtml,
  EHr,
  EHeading,
  EText,
  EContainer,
  EPreview,
  EBody,
  ESection,
  EImg,
  ELink,
} from 'vue-email';

interface Props {
  magicLink?: string;
}

withDefaults(defineProps<Props>(), {
  magicLink: 'https://raycast.com',
});
</script>
