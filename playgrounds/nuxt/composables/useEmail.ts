import { kebabCase, pascalCase } from 'scule'
import type { Email } from '@/types/email'

export function useEmail() {
  const emails = useState<Email[]>('emails')
  const email = useState<Email>('email')
  const sending = useState<boolean>('sending', () => false)
  const refresh = useState<boolean>('refresh', () => false)

  const getEmails = async () => {
    const { data, error } = await useFetch('/api/emails')

    if (error && error.value) {
      console.error(error)
      return
    }

    if (data && data.value) {
      const emailTemplates = data.value.reduce((acc, email) => {
        const emailName = email.replace('.vue', '')
        const resComponent = `Emails${pascalCase(emailName.replace(':', '-'))}`

        const parts = emailName.split(':')
        const name = kebabCase(parts[1] || parts[0])

        if (parts.length === 1) {
          acc.push({ label: name, to: `/preview/${parts[0]}`, component: email, resComponent })
        } else {
          const folder = parts[0]

          const folderObj = acc.find((item) => item.label === folder)

          if (folderObj) {
            folderObj.children = [...(folderObj.children || []), { label: name, to: `/preview/${emailName}`, component: email, resComponent }]
          } else {
            acc.push({ label: folder, children: [{ label: name, to: `/preview/${emailName}`, component: email, resComponent }] })
          }
        }

        return acc
      }, [] as Email[])

      emails.value = emailTemplates
    }
  }

  const getEmail = async (name: string) => {
    if (emails.value && emails.value.length) {
      name = `${name}.vue`
      let foundEmail = null

      const directMatch = emails.value.find((email) => email.component === name)
      if (directMatch) {
        foundEmail = directMatch
      }

      // If no direct match, search in the children array recursively
      const findInChildren = (children: Email[]): Email | null => {
        for (const child of children) {
          if (child.component === name) {
            return child
          }

          if (child.children && child.children.length) {
            const nestedMatch = findInChildren(child.children)
            if (nestedMatch) {
              return nestedMatch
            }
          }
        }
        return null
      }

      foundEmail = findInChildren(emails.value)

      if (foundEmail) email.value = foundEmail
    }

    return null
  }

  const getVueCode = async (name: string) => {
    const { data } = await useFetch<string>(`/api/markup/${name}`)

    if (data.value) return data.value

    return ''
  }

  const sendTestEmail = async (to: string, subject: string, markup: string) => {
    try {
      if (!email || !subject) return

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
