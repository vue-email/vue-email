export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/vue.svg',
        },
      ],
    },
  },
  components: {
    dirs: [
      '~/components',
      {
        path: '~/emails',
        extensions: ['vue'],
      },
    ],
  },
  modules: ['@unocss/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
});
