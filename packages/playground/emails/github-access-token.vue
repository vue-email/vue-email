<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps({
  username: {
    type: String,
    default: 'John Doe',
  },
})

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
} as CSSProperties

const container = {
  width: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
} as CSSProperties

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
} as CSSProperties

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center',
} as CSSProperties

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left',
} as CSSProperties

const button = {
  fontSize: '14px',
  backgroundColor: '#28a745',
  color: '#fff',
  borderRadius: '0.5em',
  padding: '0.3em 0.6em',
  textTransform: 'uppercase',
} as CSSProperties

const links = {
  textAlign: 'center',
} as CSSProperties

const link = {
  color: '#0366d6',
  fontSize: '12px',
} as CSSProperties

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center',
  marginTop: '60px',
} as CSSProperties
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview> A fine-grained personal access token has been added to your account </EPreview>
    <EBody :style="main">
      <EContainer :style="container">
        <EImg width="32" height="32" src="/static/github.png" alt="Github" />
        <EText :style="title">
          <strong>@{{ username }}</strong
          >, a personal access was created on your account.
        </EText>

        <ESection :style="section">
          <EText :style="text">
            Hey <strong>{{ username }}</strong
            >!
          </EText>
          <EText :style="text"> A fine-grained personal access token (<ELink href="#"> resend </ELink>) was recently added to your account. </EText>

          <EButton href="#" :style="button"> View your token </EButton>
        </ESection>
        <EText :style="links">
          <ELink href="#" :style="link"> Your security audit log </ELink>
          ・
          <ELink href="#" :style="link"> Contact support </ELink>
        </EText>

        <EText :style="footer"> GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107 </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
