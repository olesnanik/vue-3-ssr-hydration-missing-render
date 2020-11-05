import { createRouter, createWebHistory, RouteRecordRaw, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history:
    typeof window === 'undefined'
      ? createMemoryHistory(process.env.BASE_URL)
      : createWebHistory(process.env.BASE_URL),
  routes
})

export default router
