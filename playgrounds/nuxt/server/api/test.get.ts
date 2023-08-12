import { useCompiler } from '#vue-email'

export default defineEventHandler(async () => {
  try {
    const template = await useCompiler('github-access-token.vue', {
      username: 'flowko',
    })

    if (!template) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    return template
  }
  catch (error) {
    console.error(error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
