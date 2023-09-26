<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

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
  <ETailwind>
    <EHtml>
      <EHead />
      <EPreview>{{ previewText }}</EPreview>
      <EBody class="bg-white my-auto mx-auto font-sans">
        <EContainer class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]">
          <ESection class="mt-[32px]">
            <EImg src="/static/vercel-logo.png" width="40" height="37" alt="Vercel" class="my-0 mx-auto" />
          </ESection>
          <Hello />
          <EHeading class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Join <strong>{{ teamName }}</strong> on <strong>Vercel</strong>
          </EHeading>
          <EText class="text-black text-[14px] leading-[24px]"> Hello {{ username }}, </EText>
          <EText class="text-black text-[14px] leading-[24px]">
            <strong>bukinoshita</strong> (
            <ELink :href="`mailto:${invitedByEmail}`" class="text-blue-600 no-underline">
              {{ invitedByEmail }}
            </ELink>
            ) has invited you to the <strong>{{ teamName }}</strong> team on <strong>Vercel</strong>.
          </EText>
          <ESection>
            <ERow>
              <EColumn align="right">
                <EImg class="rounded-full" src="/static/vercel-user.png" width="64" height="64" />
              </EColumn>
              <EColumn align="center">
                <EImg src="/static/vercel-arrow.png" width="12" height="9" alt="invited you to" />
              </EColumn>
              <EColumn align="left">
                <EImg class="rounded-full" src="/static/vercel-team.png" width="64" height="64" />
              </EColumn>
            </ERow>
          </ESection>
          <ESection class="text-center mt-[32px] mb-[32px]">
            <EButton px="20" py="12" class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center" :href="inviteLink"> Join the team </EButton>
          </ESection>
          <EText class="text-black text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:
            <ELink :href="inviteLink" class="text-blue-600 no-underline">
              {{ inviteLink }}
            </ELink>
          </EText>
          <EHr class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <EText class="text-[#666666] text-[12px] leading-[24px]">
            This invitation was intended for
            <span class="text-black">{{ username }} </span>.This invite was sent from <span class="text-black">{{ inviteFromIp }}</span> located in
            <span class="text-black">{{ inviteFromLocation }}</span
            >. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch
            with us.
          </EText>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
