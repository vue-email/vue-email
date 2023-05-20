import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue-Email',
  description: 'An easy way to build email templates with Vue',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/vue.svg' }]],
  themeConfig: {
    logo: '/vue.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/dave136/vue-email' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present David Arenas',
    },

    nav: [
      { text: 'Docs', link: '/', activeMatch: '/' },
      // { text: 'Examples', link: '/examples/overview', activeMatch: '/examples/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Usage', link: '/usage' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Html', link: '/components/html' },
          { text: 'Head', link: '/components/head' },
          { text: 'Button', link: '/components/button' },
          { text: 'Container', link: '/components/container' },
          { text: 'Font', link: '/components/font' },
          { text: 'Column', link: '/components/column' },
          { text: 'Section', link: '/components/section' },
          { text: 'Row', link: '/components/row' },
          { text: 'Heading', link: '/components/heading' },
          { text: 'Hr', link: '/components/hr' },
          { text: 'Image', link: '/components/image' },
          { text: 'Link', link: '/components/link' },
          { text: 'Preview', link: '/components/preview' },
          { text: 'Tailwind', link: '/components/tailwind' },
          { text: 'Text', link: '/components/text' },
        ],
      },
      {
        text: 'Utilities',
        items: [{ text: 'render', link: '/utilities/render' }],
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Overview', link: '/integration/overview' },
          // { text: 'Nodemailer', link: '/integration/nodemailer' },
        ],
      },
    ],
  },
});
