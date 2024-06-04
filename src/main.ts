import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'virtual:uno.css'
import { changeThemeVariable } from './components/theme'

changeThemeVariable()

const app = createApp(App)

app.use(router)

app.mount('#app')
