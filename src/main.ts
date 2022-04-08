import { createSSRApp } from 'vue'

import App from './App.vue'
import { createSSRRouter } from './router/index'
import { createSSRStore, key } from './store/index'

import 'element-plus/dist/index.css'
import ElementPlus, { ElMessage } from 'element-plus'

import { createSSRI18n } from './lang/i18n'

export function createApp () {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRI18n()

  app.config.globalProperties.$message = ElMessage
  app.use(router)
  app.use(store, key)
  app.use(ElementPlus)
  app.use(i18n)

  return { app, router, store }
}
