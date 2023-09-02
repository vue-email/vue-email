import { kebabCase, pascalCase } from 'scule'
import type { Email } from '../../types/email'
import { createError, defineEventHandler, useStorage } from '#imports'

export default defineEventHandler(async () => {
  try {
    const nitroEmails = await useStorage('assets:emails').getKeys()

    const emails: Email[] = await Promise.all(
      nitroEmails.map(async (email: string) => {
        const data = JSON.stringify(await useStorage('assets:emails').getMeta(email))
        const emailData = JSON.parse(data)
        const content = (await useStorage('assets:emails').getItem(email)) as string

        return {
          label: pascalCase(kebabCase(email.replace('.vue', '').replace(':', '_')).split('-').join(' ')),
          filename: email,
          content,
          icon: 'i-heroicons-envelope',
          size: emailData.size,
          created: emailData.birthtime,
          modified: emailData.mtime,
        }
      }),
    )

    if (!emails || !emails.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    return emails
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
