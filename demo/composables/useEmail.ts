import { kebabCase } from 'scule'
import type { Email } from '@/types/email'

export function useEmail() {
  const components = useNuxtApp().vueApp._context.components
  const emails = useState<Email[]>('emails')
  const email = useState<Email>('email')

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

  getEmails()

  return {
    email,
    emails,
    getEmail,
  }
}
