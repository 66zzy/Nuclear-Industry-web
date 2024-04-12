import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/field_to_param',
      name: 'field_to_param',
      component: () => import('../views/field_to_param.vue')
    },
    {
      path: '/param_to_field',
      name: 'param_to_field',
      component: () => import('../views/param_to_field.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    }
  ]
})

export default router
