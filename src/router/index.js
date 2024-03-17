import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/param',
      name: 'param',
      component: () => import('../views/param.vue')
    },
    {
      path: '/visual',
      name: 'visual',
      component: () => import('../views/visual.vue')
    }
  ]
})

export default router
