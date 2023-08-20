import { dirname, fromFileUrl, resolve } from 'https://deno.land/std@0.177.0/path/mod.ts'
import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts'
import { config } from '../../dist/compiler.deno.preview.ts'

const __filename = fromFileUrl(import.meta.url)
const __dirname = resolve(dirname(__filename))

Deno.test('compiler', async ({ step }) => {
  const path = resolve(__dirname, './templates')
  console.warn(path)
  const vuemail = config(path)
  await step('It should compile vue files', async () => {
    const template = await vuemail.render('DefineComponent.vue', {
      props: {
        name: 'Dave',
      },
    })

    assertEquals(template, '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><h1>Hi! My name is Dave</h1>')
  })

  await step('Should render defineComponent setup', async () => {
    const template = await vuemail.render('DefineComponentSetup.vue', {
      props: {
        count: 2,
      },
    })

    assertEquals(
      template,
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><p>Count: 2</p><p>Double: 4</p></section>',
    )
  })

  await step('Should compile and render component defined using script setup', async () => {
    const template = await vuemail.render('ScriptSetup.vue', {
      props: {
        name: 'John Doe',
      },
    })

    assertEquals(
      template,
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><h1>Welcome John Doe</h1></section>',
    )
  })
})
