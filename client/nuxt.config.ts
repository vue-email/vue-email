export default defineNuxtConfig({
  ssr: true,
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
