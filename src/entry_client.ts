import airbnb from './db/index'
import { createApp } from './main'

const { app, router } = createApp()

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB
    .openStore({
      ...airbnb.userObjectStore,
      ...airbnb.languageObjectStore
    })
    .then((res: any) => {
      next()
    })
})

router.isReady().then(() => {
  app.mount('#app')
})
