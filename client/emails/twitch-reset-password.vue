<template>
  <e-html>
    <e-head />
    <e-preview>You updated the password for yout Twitch account</e-preview>
    <e-tailwind>
      <e-body class="bg-[#efeef1] font-['HelveticaNeue,Helvetica,Arial,sans-serif']">
        <e-container class="w-[580px] my-[30px] mx-auto bg-white">
          <e-section class="flex justify-center items-center p-[30px]">
            <e-img width="114" src="/twitch-logo.png" />
          </e-section>
          <e-section class="w-full flex">
            <e-row>
              <e-column
                class="border-b border-solid border-x-0 border-t-0 border-[rgb(238_238_238)] w-[249px]"
              />
              <e-column
                class="border-b border-solid border-x-0 border-t-0 border-[rgb(145_71_255)] w-[102px]"
              />
              <e-column
                class="border-b border-solid border-x-0 border-t-0 border-[rgb(238_238_238)] w-[249px]"
              />
            </e-row>
          </e-section>
          <e-section class="pt-[5px] pr-[50px] pb-[10px] pl-[60px]">
            <e-text class="text-[14px] leading-[1.5]">Hi {{ username }},</e-text>
            <e-text class="text-[14px] leading-[1.5]">
              You updated the password for your Twitch account on
              {{ formattedDate }}. If this was you, then no further action is required.
            </e-text>
            <e-text class="text-[14px] leading-[1.5]">
              However if you did NOT perform this password change, please
              <e-link href="#" class="underline"> reset your account password </e-link>
              immediately.
            </e-text>
            <e-text class="text-[14px] leading-[1.5]">
              Remember to use a password that is both strong and unique to your Twitch account. To
              learn more about how to create a strong and unique password,
              <e-link href="#" class="underline"> click here. </e-link>
            </e-text>
            <e-text class="text-[14px] leading-[1.5]">
              Still have questions? Please contact
              <e-link href="#" class="underline"> Twitch Support </e-link>
            </e-text>
            <e-text class="text-[14px] leading-[1.5]">
              Thanks,
              <br />
              Twitch Support Team
            </e-text>
          </e-section>
        </e-container>

        <e-section class="w-[580px] my-0 mx-auto">
          <e-row>
            <e-column align="right" class="w-[50%] pr-[8px]">
              <e-img src="/twitch-icon-twitter.png" />
            </e-column>
            <e-column align="left" class="w-[50%] pr-[8px]">
              <e-img src="/twitch-icon-facebook.png" />
            </e-column>
          </e-row>
          <e-text class="text-center text-[#706a7b]">
            © 2022 Twitch, All Rights Reserved <br />
            350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
          </e-text>
        </e-section>
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
  EColumn,
  ERow,
  ETailwind,
} from 'vue-email';

interface Props {
  username?: string;
  updatedDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  username: 'John Doe',
  updatedDate: () => new Date('June 23, 2022 4:06:00 pm UTC'),
});

const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(props.updatedDate)
);
</script>
