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
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
