<template>
  <e-html lang="en">
    <e-head />
    <e-preview preview="Welcome to vue-email" />
    <e-section :style="main">
      <e-container :style="container">
        <e-img src="https://avatars.githubusercontent.com/u/6128107?s=200&v=4" alt="Vue logo" :style="logo" width="200"
          height="50" />
        <e-text :style="paragraph">{{ name }}, welcome to vue-email</e-text>
        <e-text :style="paragraph">A Vue component library for building responsive emails</e-text>
        <e-section :style="btnContainer">
          <e-button px="12" py="12" :style="button" href="https://github.com/Dave136/vue-email">
            View on GitHub
          </e-button>
        </e-section>
        <e-text :style="paragraph">Happy coding!</e-text>
        <e-hr :style="hr" />
        <e-text :style="footer">David Arenas</e-text>
      </e-container>
    </e-section>
  </e-html>
</template>
<script lang="ts" setup>
import { EButton, EContainer, EHead, EHr, EHtml, EImg, EPreview, ESection, EText } from 'vue-email';

defineProps<{ name: string }>();

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  width: '100%',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
  height: '6em',
  width: '6em',
};

const paragraph = {
  fontFamily,
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  fontFamily,
  backgroundColor: '#41b883',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  fontFamily,
  color: '#8898aa',
  fontSize: '12px',
};
</script>
