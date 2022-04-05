import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'
import { store, key } from './store/index'

import 'element-plus/dist/index.css'
import ElementPlus, { ElMessage } from 'element-plus'

import i18n from './lang/i18n'
import airbnb from './db/index'

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB
    .openStore({
      ...airbnb.userObjectStore,
      ...airbnb.languageObjectStore
    })
    .then((res: any) => {
      console.log('create object respoisity initially', res)
      next()
    })
})

const app = createApp(App)

app.config.globalProperties.$message = ElMessage

app.use(router)
app.use(store, key)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
