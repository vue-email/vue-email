import { resolve } from 'pathe'
import { promises as fs } from 'node:fs'

const emailsFolder =
  process.env.NODE_ENV === 'production' ? 'public/emails' : 'emails'
const emailsDir = resolve(process.cwd(), emailsFolder)

export default defineEventHandler(async (event) => {
  try {
    const file =
      event.context.params && event.context.params.file
        ? event.context.params.file
        : null

    const template = resolve(emailsDir, `${file}.vue`)
    const vueMarkup = await fs.readFile(template, {
      encoding: 'utf-8',
    })

    if (!vueMarkup) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    return vueMarkup
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
