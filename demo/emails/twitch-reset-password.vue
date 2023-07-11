<script lang="ts" setup>
interface Props {
  username?: string;
  updatedDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  username: 'John Doe',
  updatedDate: () => new Date('June 23, 2022 4:06:00 pm UTC'),
})

const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(props.updatedDate),
)
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EPreview>You updated the password for yout Twitch account</EPreview>
      <EBody
        class="bg-[#efeef1] font-['HelveticaNeue,Helvetica,Arial,sans-serif']"
      >
        <EContainer class="w-[580px] my-[30px] mx-auto bg-white">
          <ESection class="flex justify-center items-center p-[30px]">
            <EImg width="114" src="/twitch-logo.png" />
          </ESection>
          <ESection class="w-full flex">
            <ERow>
              <EColumn
                class="border-b border-solid border-x-0 border-t-0 border-[rgb(238_238_238)] w-[249px]"
              />
              <EColumn
                class="border-b border-solid border-x-0 border-t-0 border-[rgb(145_71_255)] w-[102px]"
              />
              <EColumn
                class="border-b border-solid border-x-0 border-t-0 border-[rgb(238_238_238)] w-[249px]"
              />
            </ERow>
          </ESection>
          <ESection class="pt-[5px] pr-[50px] pb-[10px] pl-[60px]">
            <EText class="text-[14px] leading-[1.5]">
              Hi {{ username }},
            </EText>
            <EText class="text-[14px] leading-[1.5]">
              You updated the password for your Twitch account on
              {{ formattedDate }}. If this was you, then no further action is
              required.
            </EText>
            <EText class="text-[14px] leading-[1.5]">
              However if you did NOT perform this password change, please
              <ELink href="#" class="underline">
                reset your account password
              </ELink>
              immediately.
            </EText>
            <EText class="text-[14px] leading-[1.5]">
              Remember to use a password that is both strong and unique to your
              Twitch account. To learn more about how to create a strong and
              unique password,
              <ELink href="#" class="underline"> click here. </ELink>
            </EText>
            <EText class="text-[14px] leading-[1.5]">
              Still have questions? Please contact
              <ELink href="#" class="underline"> Twitch Support </ELink>
            </EText>
            <EText class="text-[14px] leading-[1.5]">
              Thanks,
              <br />
              Twitch Support Team
            </EText>
          </ESection>
        </EContainer>

        <ESection class="w-[580px] my-0 mx-auto">
          <ERow>
            <EColumn align="right" class="w-[50%] pr-[8px]">
              <EImg src="/twitch-icon-twitter.png" />
            </EColumn>
            <EColumn align="left" class="w-[50%] pr-[8px]">
              <EImg src="/twitch-icon-facebook.png" />
            </EColumn>
          </ERow>
          <EText class="text-center text-[#706a7b]">
            © 2023 Twitch, All Rights Reserved <br />
            350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
          </EText>
        </ESection>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
