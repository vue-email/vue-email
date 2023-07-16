import { kebabCase } from 'scule'
import type { Email } from '@/types/email'

export function useEmail() {
  const components = useNuxtApp().vueApp._context.components
  const emails = useState<Email[]>('emails')
  const email = useState<Email>('email')
  const sending = useState<boolean>('sending', () => false)
  const refresh = useState<boolean>('refresh', () => false)

  const getEmails = async () => {
    const componentNames = Object.keys(components)
      .filter((key) => {
        return key.startsWith('Emails')
      })
      .map((key) => {
        const name = key.replace('Emails', '')
        const label = kebabCase(name)

        return {
          label,
          component: key,
          to: `/preview/${label}`,
          icon: 'i-ph-file-dotted',
        }
      })

    emails.value = componentNames
  }

  const getEmail = async (name: string) => {
    if (emails.value && emails.value.length) {
      const emailObj = emails.value.find((email) => email.label === name)

      if (emailObj) {
        email.value = emailObj
      }
    }

    return null
  }

  const getVueCode = async (name: string) => {
    const { data } = await useAsyncData('markup', () =>
      $fetch<string>(`/api/markup/${name}`),
    )

    if (data.value) return data.value

    return ''
  }

  const sendTestEmail = async (to: string, subject: string, markup: string) => {
    try {
      if (!email || !subject) {
        return
      }

      sending.value = true

      const response = await fetch('https://react.email/api/send/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          subject,
          html: markup,
        }),
      })

      if (response.status === 429) {
        const { error } = await response.json()

        useToast().add({
          title: 'Too many requests',
          description: error,
          color: 'red',
          icon: 'i-ph-bell-bold',
        })
      }
    } catch (error) {
      useToast().add({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        color: 'red',
        icon: 'i-ph-bell-bold',
      })
    } finally {
      sending.value = false
    }
  }

  getEmails()

  return {
    email,
    emails,
    sending,
    refresh,
    getEmail,
    sendTestEmail,
    getVueCode,
  }
}
