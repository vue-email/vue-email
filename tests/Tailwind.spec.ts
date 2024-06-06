import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ETailwind, useRender } from '../src'
import MyEmail from './components/MyEmail.vue'
import Tailwind from './components/Tailwind.vue'

describe('tailwind component', () => {
  describe('inline styles', () => {
    it('should render children with inline Tailwind styles', async () => {
      const component = h(ETailwind, undefined, {
        default: () =>
          h(
            'div',
            {
              class: 'bg-black text-white',
            },
            {
              default: () => 'Hello world',
            },
          ),
      })

      const actualOutput = await useRender(component)

      expect(actualOutput.html).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div class="" style="background-color:rgb(0,0,0);color:rgb(255,255,255);">Hello world</div>"',
      )
    })

    it('should render correct styles for nested components', async () => {
      const actualOutput = await useRender(MyEmail)

      expect(actualOutput.html).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><table align="center" width="100%" data-id="__vue-email-section" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;" class="text-accent myemail-class"> MyEmail Component </p><a data-id="__vue-email-link" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none;" href="https://vercel.com/teams/invite/foo?test=123&amp;test2=456" target="_blank"> https://vercel.com/teams/invite/foo?test=123&amp;test2=456 </a><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;" class="text-accent base-email"> BaseEmail Component </p><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;" class="text-accent text-center footer-class"> Footer Component </p></td></tr></tbody></table>"',
      )
    })

    it('full tailwind component', async () => {
      const actualOutput = await useRender(h(Tailwind, {
        invitedByEmail: 'anpch@example.com',
        inviteLink: 'https://vercel.com/teams/invite/foo?test=123&test2=456',
        inviteFromIp: '172.0.0.1',
        inviteFromLocation: 'San Francisco, CA',
        invitedByUsername: 'bukinoshita',
        teamName: 'My project',
        username: 'John Doe',
      }))

      expect(actualOutput.html).toMatchInlineSnapshot(
        '"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html id="__vue-email" lang="en" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>@media(min-width:768px){.md_p-7{padding:1.75rem!important}}</style></head><body data-id="__vue-email-body" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;"><table align="center" width="100%" data-id="__vue-email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:37.5em;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px;border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;max-width:465px;" class="md_p-7"><tbody><tr style="width: 100%"><td><table align="center" width="100%" data-id="__vue-email-section" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:32px;"><tbody><tr><td><img data-id="__vue-email-img" style="display:block;outline:none;border:none;text-decoration:none;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto;" src="https://vue-email-demo.vercel.app/static/vercel-logo.png" width="40" height="37" alt="Vercel"></td></tr></tbody></table><h1 data-id="__vue-email-heading" style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px;"> Join <strong>My project</strong> on <strong>Vercel</strong></h1><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0);font-size:14px;line-height:24px;"> Hello John Doe, </p><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0);font-size:14px;line-height:24px;"><strong>bukinoshita</strong> ( <a data-id="__vue-email-link" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none;" href="mailto:anpch@example.com" target="_blank">anpch@example.com</a> ) has invited you to the <strong>My project</strong> team on <strong>Vercel</strong>. </p><table align="center" width="100%" data-id="__vue-email-section" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><table align="center" width="100%" data-id="__vue-email-row" role="presentation" cellspacing="0" cellpadding="0" border="0"><tbody style="width: 100%"><tr style="width: 100%"><td data-id="__vue-email-column" role="presentation" align="right"><img data-id="__vue-email-img" style="display:block;outline:none;border:none;text-decoration:none;border-radius:9999px;" src="https://vue-email-demo.vercel.app/static/vercel-user.png" width="64" height="64"></td><td data-id="__vue-email-column" role="presentation" align="center"><img data-id="__vue-email-img" style="display:block;outline:none;border:none;text-decoration:none;" src="https://vue-email-demo.vercel.app/static/vercel-arrow.png" width="12" height="9" alt="invited you to"></td><td data-id="__vue-email-column" role="presentation" align="left"><img data-id="__vue-email-img" style="display:block;outline:none;border:none;text-decoration:none;border-radius:9999px;" src="https://vue-email-demo.vercel.app/static/vercel-team.png" width="64" height="64"></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" data-id="__vue-email-section" border="0" cellpadding="0" cellspacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px;"><tbody><tr><td><a data-id="__vue-email-button" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding:12px 20px;" href="https://vercel.com/teams/invite/foo?test=123&amp;test2=456" target="_blank"><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:9;"> Join the team </span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td></tr></tbody></table><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0);font-size:14px;line-height:24px;"> or copy and paste this URL into your browser: <a data-id="__vue-email-link" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none;" href="https://vercel.com/teams/invite/foo?test=123&amp;test2=456" target="_blank">https://vercel.com/teams/invite/foo?test=123&amp;test2=456</a></p><hr data-id="__vue-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px;"><p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(102,102,102);font-size:12px;line-height:24px;"> This invitation was intended for <span class="" style="color:rgb(0,0,0);">John Doe</span>.This invite was sent from <span class="" style="color:rgb(0,0,0);">172.0.0.1</span> located in <span class="" style="color:rgb(0,0,0);">San Francisco, CA</span>. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account&#39;s safety, please reply to this email to get in touch with us. </p></td></tr></tbody></table></body></html>"',
      )
    })
  })
})
