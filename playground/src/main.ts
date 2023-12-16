import { createApp } from 'vue'
import { VueEmailPlugin } from 'vue-email'
import App from './App.vue'

const app = createApp(App)

app.use(VueEmailPlugin)

app.mount('#app')
