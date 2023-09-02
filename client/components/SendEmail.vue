<script setup lang="ts">
const { sending, sendTestEmail, template } = useEmail()
const { email } = useTool()
const emailTo = computed(() => email.value || '')
const emailSubject = ref('Testing Vue Email')
const { metaSymbol } = useShortcuts()
const sendBtn = ref()

defineShortcuts({
  meta_e: {
    usingInput: true,
    whenever: [],
    handler: () => {
      sendBtn.value.$el.click()
    },
  },
})
</script>

<template>
  <UPopover
    :ui="{
      base: 'p-4',
      width: 'w-72',
    }"
  >
    <UTooltip text="Send Test Email" :shortcuts="[metaSymbol, 'E']">
      <UButton ref="sendBtn" icon="i-ph-magic-wand-bold" size="sm" variant="solid" label="Send" class="px-4" />
    </UTooltip>
    <template #panel>
      <label for="to" class="text-gray-400 text-xs uppercase font-medium mb-2 block">Recipient</label>
      <UInput id="to" :value="emailTo" type="email" color="gray" variant="outline" placeholder="you@example.com" @input="email = ($event.target as HTMLInputElement).value" />
      <label for="to" class="text-gray-400 text-xs uppercase font-medium mt-3 mb-2 block">Subject</label>
      <UInput id="to" v-model="emailSubject" type="text" color="gray" variant="outline" placeholder="My Email" />

      <div class="flex items-center justify-between mt-3">
        <span class="inline-block text-xs text-gray-100 font-normal"
          >Powered by
          <a class="hover:text-gray-100 transition ease-in-out underline underline-offset-2 duration-300" href="https://resend.com" target="_blank" rel="noreferrer"
            >Resend</a
          ></span
        >
        <UButton
          color="primary"
          :disabled="!sending && (!emailTo || !emailSubject) && (emailSubject.trim().length === 0 || emailTo.trim().length === 0)"
          :loading="sending"
          variant="solid"
          label="Send"
          @click="sendTestEmail(emailTo, emailSubject, template.html)"
        />
      </div>
    </template>
  </UPopover>
</template>

<style scoped></style>
