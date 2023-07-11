import { kebabCase } from 'scule'
import type { Email } from '@/types/email'

export function useEmail() {
  const components = useNuxtApp().vueApp._context.components
  const emails = useState<Email[]>('emails')
  const email = useState<Email>('email')
  const sending = useState<boolean>('sending')

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

        alert(error)
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      sending.value = false
    }
  }

  getEmails()

  return {
    email,
    emails,
    sending,
    getEmail,
    sendTestEmail,
  }
}
