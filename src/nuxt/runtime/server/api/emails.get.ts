import { createError, defineEventHandler, useStorage } from '#imports'

export default defineEventHandler(async () => {
  try {
    const template = await useStorage('assets:emails').getKeys()

    if (!template) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    return template
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
