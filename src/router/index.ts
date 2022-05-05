import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/homeIndex.vue'),
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine/mineIndex.vue'),
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/loginIndex.vue'),
    meta: {
      title: '',
      keepAlive: false
    }
  }
]

export function createSSRRouter () {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
