import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { config } from '../../src/compiler'

describe('compiler', () => {
  const path = resolve(__dirname, './templates')

  it('It should compile vue files', async () => {
    const vuemail = config({
      dir: path,
    })

    const template = await vuemail.render('DefineComponent.vue', {
      props: {
        name: 'Dave',
      },
    })

    expect(template).toBe('<h1>Hi! My name is Dave</h1>')
  })

  it('Should render defineComponent setup', async () => {
    const vuemail = config({
      dir: path,
    })

    const template = await vuemail.render('DefineComponentSetup.vue', {
      props: {
        count: 2,
      },
    })

    expect(template).toBe('<section><p>Count: 2</p><p>Double: 4</p></section>')
  })

  it('Should compile and render component defined using script setup', async () => {
    const vuemail = config({
      dir: path,
    })

    const template = await vuemail.render('ScriptSetup.vue', {
      props: {
        name: 'John Doe',
      },
    })

    expect(template).toBe('<section><h1>Welcome John Doe</h1></section>')
  })

  it('It should render GithubAccessToken template', async () => {
    const vuemail = config({
      dir: path,
    })

    const template = await vuemail.render('GithubAccessToken.vue', {
      props: {
        username: 'John Doe',
      },
    })

    console.log(template)

    expect(true).toBe(true)
  })
})
