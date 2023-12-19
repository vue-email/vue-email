<script setup lang="ts">
import { EBody, EContainer, EHead, EHtml, EPreview, ETailwind, EText } from '../../src/components'

interface Props {
  invitedByUsername?: string
  teamName?: string
  username?: string
  invitedByEmail?: string
  inviteLink?: string
  inviteFromIp?: string
  inviteFromLocation?: string
}

const props = withDefaults(defineProps<Props>(), {
  teamName: 'My project',
  username: 'John Doe',
  invitedByEmail: 'anpch@example.com',
  inviteLink: 'https://vercel.com/teams/invite/foo',
  inviteFromIp: '172.0.0.1',
  inviteFromLocation: 'San Francisco, CA',
})

const previewText = `Join ${props.invitedByUsername} on Vercel`
</script>

<template>
  <EHtml>
    <ETailwind>
      <EHead />
      <EPreview>{{ previewText }}</EPreview>
      <EBody class="bg-white my-auto mx-auto font-sans">
        <EContainer>
          <EText>
            Only this text have text-base applied
          </EText>
          <EText>
            This text should have text-base applied, but does not.
          </EText>
        </EContainer>
      </EBody>
    </ETailwind>
  </EHtml>
</template>
