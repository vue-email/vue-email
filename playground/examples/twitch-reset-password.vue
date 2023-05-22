<template>
  <e-html>
    <e-head />
    <e-preview>You updated the password for yout Twitch account</e-preview>
    <e-tailwind>
      <e-body class="bg-[#efeef1] font-['HelveticaNeue,Helvetica,Arial,sans-serif']">
        <e-container class="w-[580px] my-[30px] mx-auto bg-white">
          <e-section class="flex justify-center items-center p-[30px]">
            <e-img width="14" class="h-6" :src="TwitchLogo" />
          </e-section>
        </e-container>
      </e-body>
    </e-tailwind>
  </e-html>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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
} from '../../src';

import TwitchLogo from '../../client/public/twitch-logo.png';

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
