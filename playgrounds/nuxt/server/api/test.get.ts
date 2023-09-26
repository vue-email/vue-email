import { useCompiler } from '#vue-email'

export default defineEventHandler(async () => {
  try {
    const template = await useCompiler('Components:translation.vue', {
      props: {
        username: 'flowko',
      },
      i18n: {
        defaultLocale: 'en',
        translations: {
          en: {
            message: 'Welcome to dashboard {username}',
          },
          es: {
            message: 'Bienvenido al panel {username}',
          },
        },
      },
    })

    if (!template) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    return template
  } catch (error) {
    console.error(error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
