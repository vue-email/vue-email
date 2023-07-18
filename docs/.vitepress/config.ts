import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { description } from '../../package.json'
import { name, version } from '../../packages/vue-email/package.json'
import { github, ogImage, ogUrl, releases } from './meta'

const url = new URL(ogUrl)

const components = [
  {
    text: 'HTML',
    link: '/components/html',
  },
  {
    text: 'Head',
    link: '/components/head',
  },
  {
    text: 'Button',
    link: '/components/button',
  },
  {
    text: 'Column',
    link: '/components/column',
  },
  {
    text: 'Row',
    link: '/components/row',
  },
  {
    text: 'Container',
    link: '/components/container',
  },
  {
    text: 'Font',
    link: '/components/font',
  },
  {
    text: 'Heading',
    link: '/components/heading',
  },
  {
    text: 'Hr',
    link: '/components/hr',
  },
  {
    text: 'Image',
    link: '/components/image',
  },
  {
    text: 'Link',
    link: '/components/link',
  },
  {
    text: 'Markdown',
    link: '/components/markdown',
  },
  {
    text: 'Preview',
    link: '/components/preview',
  },
  {
    text: 'Section',
    link: '/components/section',
  },
  {
    text: 'Tailwind',
    link: '/components/tailwind',
  },
  {
    text: 'Text',
    link: '/components/text',
  },
]

const integrations = [
  {
    text: 'Nodemailer',
    link: '/integrations/nodemailer',
  },
  {
    text: 'Resend',
    link: '/integrations/resend',
  },
  {
    text: 'SendGrid',
    link: '/integrations/sendgrid',
  },
  {
    text: 'Postmark',
    link: '/integrations/postmark',
  },
  {
    text: 'AWS SES',
    link: '/integrations/aws-ses',
  },
  {
    text: 'MailSend',
    link: '/integrations/mailsend',
  },
  {
    text: 'Plunk',
    link: '/integrations/plunk',
  },
    {
    text: 'MailPace',
    link: '/integrations/mailpace',
  },
]

export default defineConfig({
  lang: 'en-US',
  title: name,
  description: description,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:title', content: name }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: name }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@davejs4' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/Dave136/vue-email/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    nav: nav(),

    sidebar: {
      '/': sidebar(),
      '/getting-started/': sidebar(),
      '/components': sidebar(),
    },

    socialLinks: [{ icon: 'github', link: github }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present',
    },

    search: {
      provider: 'local',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Components',
      activeMatch: '^/components/',
      items: components,
    },
    {
      text: 'Integrations',
      activeMatch: '^/integrations/',
      items: integrations,
    },
    {
      text: 'Demo',
      link: 'https://vue-email-demo.vercel.app/',
    },
    {
      text: `v${version}`,
      items: [
        {
          text: 'Release Notes ',
          link: releases,
        },
      ],
    },
  ]
}

function sidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Overview',
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Contributing', link: '/contributing' },
        { text: 'Roadmap', link: '/roadmap' },
      ],
    },
    {
      text: 'Getting Started',
      items: [
        {
          text: 'Setup',
          link: '/getting-started/setup',
        },
        {
          text: 'Nuxt Setup',
          link: '/getting-started/nuxt',
        },
      ],
    },
    {
      text: 'Components',
      items: components,
    },
    {
      text: 'Utilities',
      items: [{ text: 'Render', link: '/utilities/render' }],
    },
    {
      text: 'Integrations',
      items: integrations,
    },
    {
      text: 'Demo Playground',
      link: 'https://github.com/Dave136/vue-email/tree/main/demo',
    },
  ]
}
