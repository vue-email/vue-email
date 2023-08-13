import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { config } from '../../src/compiler'

describe('compiler', () => {
  const path = resolve(__dirname, './templates')
  const vuemail = config(path)

  it('It should compile vue files', async () => {
    const template = await vuemail.render('DefineComponent.vue', {
      props: {
        name: 'Dave',
      },
    })

    expect(template).toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><h1>Hi! My name is Dave</h1>')
  })

  it('Should render defineComponent setup', async () => {
    const template = await vuemail.render('DefineComponentSetup.vue', {
      props: {
        count: 2,
      },
    })

    expect(template).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><p>Count: 2</p><p>Double: 4</p></section>',
    )
  })

  it('Should compile and render component defined using script setup', async () => {
    const template = await vuemail.render('ScriptSetup.vue', {
      props: {
        name: 'John Doe',
      },
    })

    expect(template).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><h1>Welcome John Doe</h1></section>',
    )
  })
})
