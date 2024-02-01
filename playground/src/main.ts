import { createApp } from 'vue'
import { VueEmailPlugin } from 'vue-email'
import App from './App.vue'

const app = createApp(App)

app.use(VueEmailPlugin, {
  baseUrl: 'https://vue-email-demo.vercel.app/',
  tailwind: {
    theme: {
      extend: {
        colors: {
          primary: '#ea580c',
          secondary: '#ca8a04',
        },
      },
    },
  },
})

app.mount('#app')
