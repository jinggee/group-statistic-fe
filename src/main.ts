import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
// import '@/styles/index.less'

import '../mock/index'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).mount('#app')
