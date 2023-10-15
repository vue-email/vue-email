<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineProps } from 'vue'

const props = defineProps({
  username: {
    type: String,
    default: 'John Doe',
  },
  updatedDate: {
    type: Date,
    default: () => new Date('June 23, 2022 4:06:00 pm UTC'),
  },
})

const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(props.updatedDate),
)

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif'

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
} as CSSProperties

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
} as CSSProperties

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
} as CSSProperties

const footer = {
  width: '580px',
  margin: '0 auto',
} as CSSProperties

const content = {
  padding: '5px 50px 10px 60px',
} as CSSProperties

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
} as CSSProperties

const sectionsBorders = {
  width: '100%',
  display: 'flex',
} as CSSProperties

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
} as CSSProperties

const sectionCenter = {
  borderBottom: '1px solid rgb(145,71,255)',
  width: '102px',
} as CSSProperties

const link = {
  textDecoration: 'underline',
} as CSSProperties
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EPreview>You updated the password for yout Twitch account</EPreview>
      <EBody :style="main">
        <EContainer :style="container">
          <ESection :style="logo">
            <EImg width="114" src="/static/twitch-logo.png" />
          </ESection>
          <ESection :style="sectionsBorders">
            <ERow>
              <EColumn :style="sectionBorder" />
              <EColumn :style="sectionCenter" />
              <EColumn :style="sectionBorder" />
            </ERow>
          </ESection>
          <ESection :style="content">
            <EText :style="paragraph"> Hi {{ username }}, </EText>
            <EText :style="paragraph">
              You updated the password for your Twitch account on
              {{ formattedDate }}. If this was you, then no further action is required.
            </EText>
            <EText :style="paragraph">
              However if you did NOT perform this password change, please
              <ELink href="#" :style="link"> reset your account password </ELink>
              immediately.
            </EText>
            <EText :style="paragraph">
              Remember to use a password that is both strong and unique to your Twitch account. To learn more about how to create a strong and unique password,
              <ELink href="#" :style="link"> click here. </ELink>
            </EText>
            <EText :style="paragraph">
              Still have questions? Please contact
              <ELink href="#" :style="link"> Twitch Support </ELink>
            </EText>
            <EText :style="paragraph">
              Thanks,
              <br />
              Twitch Support Team
            </EText>
          </ESection>
        </EContainer>

        <ESection :style="footer">
          <ERow>
            <EColumn align="right" style="width: 50%; padding-right: 8px">
              <EImg src="/static/twitch-icon-twitter.png" />
            </EColumn>
            <EColumn align="left" style="width: 50%; padding-left: 8px">
              <EImg src="/static/twitch-icon-facebook.png" />
            </EColumn>
          </ERow>
          <EText style="text-align: center; color: #706a7b">
            © 2023 Twitch, All Rights Reserved <br />
            350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
          </EText>
        </ESection>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
