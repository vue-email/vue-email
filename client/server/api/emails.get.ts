import { kebabCase, pascalCase } from 'scule'
import { createError, defineEventHandler, useStorage } from '#imports'

export default defineEventHandler(async () => {
  try {
    const nitroEmails = await useStorage('assets:emails').getKeys()

    const emails = await Promise.all(
      nitroEmails.map(async (email) => {
        const data = JSON.stringify(await useStorage('assets:emails').getMeta(email))
        const emailData = JSON.parse(data)

        return {
          label: pascalCase(kebabCase(email.replace('.vue', '').replace(':', '_')).split('-').join(' ')),
          filename: email,
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
