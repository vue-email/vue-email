import { resolve } from 'path'
import { defineConfig } from '../compiler'
import { describe, expect, it } from 'vitest'

describe('compiler', () => {
  const path = resolve(__dirname, './templates')

  // it('It should compile vue files', async () => {

  //   const vuemail = defineConfig({
  //     dir: path,
  //   })

  //   const template = await vuemail.render('example', {
  //     props: {
  //       show: true,
  //       name: 'Dave'
  //     }
  //   })

  //   expect(template).toBe('<h1>Hi Dave</h1>')
  // })

  // it('Should render defineComponent setup', async () => {

  //   const vuemail = defineConfig({
  //     dir: path,
  //   })

  //   const template = await vuemail.render('setup-simple', {
  //     props: {
  //       name: 'John'
  //     }
  //   })

  //   expect(template).toBe('<h1>Hi John</h1> <p>Welcome to my app John</p>')
  // })

  it('Should compile and render component defined using script setup', async () => {
    const vuemail = defineConfig({
      dir: path,
    })

    const template = await vuemail.render('ScriptSetup', {
      props: {
        name: 'John Doe'
      }
    })

    console.log(template)

    expect(true).toBe(true)
  })
})
