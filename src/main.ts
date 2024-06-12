import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'virtual:uno.css'
import { setThemeVariable } from '@/helpers/theme'

createApp(App).use(router).mount('#app')

setThemeVariable()
