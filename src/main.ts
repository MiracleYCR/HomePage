import { createSSRApp } from 'vue'

import App from './App.vue'
import { createSSRRouter } from './router/index'
import { createSSRStore, key } from './store/index'

import 'element-plus/dist/index.css'
import ElementPlus, { ElMessage } from 'element-plus'

import { sync } from 'vuex-router-sync'
import { createSSRI18n } from './lang/i18n'

export function createApp () {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRI18n()

  // 将 router 的信息同步到 store 中
  sync(store, router)

  app.config.globalProperties.$message = ElMessage
  app.use(router)
  app.use(store, key)
  app.use(ElementPlus)
  app.use(i18n)

  return { app, router, store }
}

export function asyncDataFilter (actived: any, store: any, router: any) {
  return Promise.all(
    actived.map((comp: any) => {
      if (comp.asyncData) {
        return comp.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })
  )
}
