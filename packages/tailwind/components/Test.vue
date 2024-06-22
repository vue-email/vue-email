<template>
    <Hr class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <Text class="text-[#666666] text-[12px] leading-[24px]">
            This invitation was intended for
            <span class="text-black">{{ username }} </span>.This invite was sent from <span class="text-black">{{ inviteFromIp }}</span> located in
            <span class="text-primary">{{ inviteFromLocation }}</span>. If you were not xpecting this invitation, you can ignore this mail. If you are concerned about your account's safety, please reply to this mail to get in touch
            with us.
          </Text>
</template>

<script setup lang="ts">

import { Hr } from '@vue-email/hr'
import { Text } from '@vue-email/text'
// import { Tailwind } from '../src/index'

defineProps<{
  username?: string
  inviteFromIp?: string
  inviteFromLocation?: string
}>()

</script>
