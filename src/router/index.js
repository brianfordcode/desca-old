import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/setups/:user',
    name: 'Setups',
    component: () => import('../views/Setups.vue')
  },
  {
    path: '/edit/:user/:setupId',
    name: 'Edit',
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/preview/:user/:setupId',
    name: 'Preview',
    component: () => import('../views/Preview.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: "history",
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
