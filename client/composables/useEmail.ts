import { kebabCase } from 'scule'
import pretty from 'pretty'
import { convert } from 'html-to-text'
import type { Email } from '@/types/email'
import { host } from '@/util/logic'

export function useEmail() {
  const emails = useState<Email[]>('emails')
  const email = useState<Email>('email')
  const sending = useState<boolean>('sending', () => false)
  const refresh = useState<boolean>('refresh', () => false)

  const getEmails = async () => {
    const { data, error } = await useFetch<string[]>('/api/emails', {
      baseURL: host.value,
    })

    if (error && error.value) {
      console.error(error)
      return
    }

    if (data && data.value) {
      const emailTemplates = data.value.reduce((acc, email) => {
        const emailName = email.replace('.vue', '')

        const parts = emailName.split(':')
        const name = kebabCase(parts[parts.length - 1])
        let targetArray = acc
        for (let i = 0; i < parts.length - 1; i++) {
          const folder = parts[i]
          const folderObj = targetArray.find((item) => item.label === folder)

          if (folderObj) {
            targetArray = folderObj.children || []
          } else {
            const newFolderObj = { label: folder, children: [] }
            targetArray.push(newFolderObj)
            targetArray = newFolderObj.children
          }
        }

        targetArray.push({ label: name, to: `/preview/${emailName}`, component: email, icon: 'i-ph-file-bold' })

        return acc
      }, [] as Email[])

      emails.value = emailTemplates
    }
  }

  const getEmail = async (name: string) => {
    if (emails.value && emails.value.length) {
      name = `${name}.vue`
      let foundEmail = null

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

      const directMatch = emails.value.find((email) => email.component === name)
      if (directMatch) {
        foundEmail = directMatch
      } else {
        // If no direct match, search recursively in the children array
        foundEmail = findInChildren(emails.value)
      }

      if (foundEmail) {
        email.value = foundEmail
      }
    }

    return null
  }

  const render = async (name: string) => {
    const { data } = await useFetch<string>(`/api/render/${name}`, {
      baseURL: host.value,
    })

    if (data.value)
      return {
        html: pretty(data.value),
        txt: convert(data.value, {
          selectors: [
            { selector: 'img', format: 'skip' },
            { selector: '#__vue-email-preview', format: 'skip' },
          ],
        }),
      }

    return null
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
    render,
  }
}
