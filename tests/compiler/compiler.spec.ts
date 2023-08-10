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
        username: 'Dave',
      },
    })

    expect(template).toMatchInlineSnapshot(
      '"<html id=\\"__vue-email\\" lang=\\"en\\" dir=\\"ltr\\"><!--[--><head><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"><!--[--><!--]--></head><div id=\\"__vue-email-preview\\" style=\\"display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;\\">A fine-grained personal access token has been added to your account <div> ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏</div></div><body data-id=\\"__vue-email-body\\" style=\\"background-color:#ffffff;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Helvetica,Arial,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;;\\"><!--[--><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-container\\" role=\\"presentation\\" cellspacing=\\"0\\" cellpadding=\\"0\\" border=\\"0\\" style=\\"max-width:37.5em;width:480px;margin:0 auto;padding:20px 0 48px;\\"><tbody><tr style=\\"width:100%;\\"><td><!--[--><img data-id=\\"__vue-email-img\\" style=\\"display:block;outline:none;border:none;text-decoration:none;\\" src=\\"/static/github.png\\" width=\\"32\\" height=\\"32\\" alt=\\"Github\\"><p data-id=\\"__vue-email-text\\" style=\\"font-size:14px;line-height:24px;margin:16px 0;font-size:24px;line-height:1.25;\\"><!--[--><strong>@Dave</strong>, a personal access was created on your account. <!--]--></p><table align=\\"center\\" width=\\"100%\\" data-id=\\"__vue-email-section\\" border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\" role=\\"presentation\\" style=\\"padding:24px;border:solid 1px #dedede;border-radius:5px;text-align:center;\\"><tbody><tr><td><!--[--><p data-id=\\"__vue-email-text\\" style=\\"font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left;\\"><!--[--> Hey <strong>Dave</strong>! <!--]--></p><p data-id=\\"__vue-email-text\\" style=\\"font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left;\\"><!--[-->A fine-grained personal access token (<a data-id=\\"__vue-email-link\\" style=\\"color:#067df7;text-decoration:none;\\" href=\\"#\\" target=\\"_blank\\"><!--[--> resend <!--]--></a>) was recently added to your account.<!--]--></p><a data-id=\\"__vue-email-button\\" style=\\"font-size:14px;background-color:#28a745;color:#fff;line-height:100%;border-radius:0.5em;padding:0px 0px;text-decoration:none;display:inline-block;max-width:100%;\\" href=\\"#\\" target=\\"_blank\\"><span><!--[if mso]><i style=\\"letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0\\" hidden>&nbsp;</i><![endif]--></span><span style=\\"font-size:14px;background-color:#28a745;color:#fff;line-height:120%;border-radius:0.5em;padding:0.75em 1.5em;max-width:100%;display:inline-block;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0;\\"><!--[-->View your token<!--]--></span><span><!--[if mso]><i style=\\"letter-spacing: 0px;mso-font-width:-100%\\" hidden>&nbsp;</i><![endif]--></span></a><!--]--></td></tr></tbody></table><p data-id=\\"__vue-email-text\\" style=\\"font-size:14px;line-height:24px;margin:16px 0;text-align:center;\\"><!--[--><a data-id=\\"__vue-email-link\\" style=\\"color:#0366d6;text-decoration:none;font-size:12px;\\" href=\\"#\\" target=\\"_blank\\"><!--[-->Your security audit log<!--]--></a> ・ <a data-id=\\"__vue-email-link\\" style=\\"color:#0366d6;text-decoration:none;font-size:12px;\\" href=\\"#\\" target=\\"_blank\\"><!--[-->Contact support<!--]--></a><!--]--></p><p data-id=\\"__vue-email-text\\" style=\\"font-size:14px;line-height:24px;margin:16px 0;color:#6a737d;font-size:12px;text-align:center;margin-top:60px;\\"><!--[-->GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107<!--]--></p><!--]--></td></tr></tbody></table><!--]--></body><!--]--></html>"',
    )
  })
})
