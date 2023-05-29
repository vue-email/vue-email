<script lang="ts" setup>
import { ref } from 'vue';
import { EButton, EContainer, EHead, EHr, EHtml, EImg, EPreview, ESection, EText } from 'vue-email';
import logoUrl from '../../src/assets/vue.svg';

const firstName = ref('Dave');

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
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

<template>
  <e-html lang="en">
    <e-head />
    <e-preview>Welcome to vue-email</e-preview>
    <e-section :style="main">
      <e-container :style="container">
        <e-img :src="logoUrl" alt="Svelte logo" :style="logo" width="200" height="50" />
        <e-text :style="paragraph">{{ firstName }}, welcome to vue-email</e-text>
        <e-text :style="paragraph"> A Vue component library for building responsive emails </e-text>
        <e-section :style="btnContainer">
          <e-button :p-x="12" :p-y="12" :style="button" href="https://github.com/Dave136/vue-email">
            View on GitHub
          </e-button>
        </e-section>
        <e-text :style="paragraph">Happy coding!</e-text>
        <e-hr :style="hr" />
        <e-text :style="footer"> David Arenas </e-text>
      </e-container>
    </e-section>
  </e-html>
</template>
