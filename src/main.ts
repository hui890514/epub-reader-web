import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'virtual:uno.css'
import { changeThemeVariable } from './components/theme'
import { getCurrentThemeIndex } from './components/storage'

changeThemeVariable(getCurrentThemeIndex())

const app = createApp(App)

app.use(router)

app.mount('#app')
