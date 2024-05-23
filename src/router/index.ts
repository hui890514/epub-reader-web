import { createRouter, createWebHistory } from 'vue-router'
import ReaderView from '@/views/ReaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ReaderView,
    },
  ],
})

export default router
