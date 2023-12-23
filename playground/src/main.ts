import { createApp } from 'vue'
import { VueEmailPlugin } from 'vue-email'
import App from './App.vue'

const app = createApp(App)

app.use(VueEmailPlugin, {
  baseUrl: 'https://vue-email-demo.vercel.app/',
  tailwindConfig: {
    content: [],
    theme: {
      extend: {
        colors: {
          primary: '#007291',
        },
      },
    },
    daisyui: {
      themes: ['winter'],
    },
    plugins: [
      (await import('daisyui')).default,
    ],
  },
})

app.mount('#app')
