<template>
  <e-tailwind>
    <e-html>
      <e-head />
      <e-preview>{{ previewText }}</e-preview>
      <e-body class="bg-white my-auto mx-auto font-sans">
        <e-container
          class="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]"
        >
          <e-section class="mt-[32px] md:mt-[60px]">
            <e-img :src="VercelLogo" width="40" height="37" alt="Vercel" class="my-0 mx-auto" />
          </e-section>
          <e-heading
            as="h2"
            my="30"
            class="text-black text-[24px] font-normal text-center p-0"
            style="background-color: red"
          >
            Join <strong>{{ teamName }}</strong> on <strong>Vercel</strong>
          </e-heading>
          <e-text class="text-black text-[14px] leading-[24px]"> Hello {{ username }}, </e-text>
          <e-text class="text-black text-[14px] leading-[24px]">
            <strong>bukinoshita</strong> (
            <e-link :href="`mailto:${invitedByEmail}`" class="text-blue-600 no-underline">
              {{ invitedByEmail }}
            </e-link>
            ) has invited you to the <strong>{{ teamName }}</strong> team on
            <strong>Vercel</strong>.
          </e-text>
          <e-section>
            <e-row>
              <e-column align="right">
                <e-img class="rounded-full" :src="userImage" width="64" height="64" />
              </e-column>
              <e-column align="center">
                <e-img :src="vercelArrow" width="12" height="9" alt="invited you to" />
              </e-column>
              <e-column align="left">
                <e-img class="rounded-full" :src="teamImage" width="64" height="64" />
              </e-column>
            </e-row>
          </e-section>
          <e-section class="text-center mt-[32px] mb-[32px]">
            <e-button
              px="20"
              py="10"
              class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
              :href="inviteLink"
            >
              Join the team
            </e-button>
          </e-section>
          <e-text class="text-black text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:
            <e-link :href="inviteLink" class="text-blue-600 no-underline">{{ inviteLink }}</e-link>
          </e-text>
          <e-hr class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <e-text class="text-[#666666] text-[12px] leading-[24px]">
            This invitation was intended for
            <span class="text-black">{{ username }} </span>.This invite was sent from
            <span class="text-black">{{ inviteFromIp }}</span> located in
            <span class="text-black">{{ inviteFromLocation }}</span
            >. If you were not expecting this invitation, you can ignore this email. If you are
            concerned about your account's safety, please reply to this email to get in touch with
            us.
          </e-text>
          <e-button
            v-for="t in [1, 2, 3]"
            :key="t"
            px="20"
            py="10"
            href="https://google.com"
            class="text-[14px] bg-[#28a745] text-white leading-[1.5] rounded-[.5em]"
          >
            View your token {{ t }}
          </e-button>
        </e-container>
      </e-body>
    </e-html>
  </e-tailwind>
</template>

<script lang="ts" setup>
import {
  EHead,
  EHtml,
  EText,
  EButton,
  EContainer,
  EPreview,
  EBody,
  ESection,
  EImg,
  EHeading,
  ELink,
  EColumn,
  ERow,
  EHr,
  ETailwind,
} from 'vue-email';
import VercelLogo from '../assets/vercel-logo.png';
import userImage from '../assets/vercel-user.png';
import teamImage from '../assets/vercel-team.png';
import vercelArrow from '../assets/vercel-arrow.png';

interface Props {
  invitedByUsername?: string;
  teamName?: string;
  username?: string;
  invitedByEmail?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const props = withDefaults(defineProps<Props>(), {
  teamName: 'My project',
  username: 'John Doe',
  invitedByEmail: 'anpch@example.com',
  inviteLink: 'https://vercel.com/teams/invite/foo',
  inviteFromIp: '204.168.127.12',
  inviteFromLocation: 'San Francisco, CA',
  invitedByUsername: 'bukinoshita',
});

const previewText = `Join ${props.invitedByUsername} on Vercel`;
</script>
