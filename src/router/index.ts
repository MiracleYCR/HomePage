import { createRouter, createWebHistory } from 'vue-router'

// import Home from '@/views/home/index.vue'
import Mine from '@/views/mine/index.vue'
import Login from '@/views/login/index.vue'

const routes = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     title: '',
  //     keepAlive: false
  //   }
  // },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '',
      keepAlive: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
