import airbnb from './db/index'
import { createApp, asyncDataFilter } from './main'

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

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
  router.beforeResolve((to, from, next) => {
    const toComps = router
      .resolve(to)
      .matched.flatMap(record => Object.values(record.components))

    const fromComps = router
      .resolve(from)
      .matched.flatMap(record => Object.values(record.components))

    const actived = toComps.filter((c, i) => {
      return fromComps[i] !== c
    })

    if (!actived.length) {
      return next()
    }

    asyncDataFilter(actived, store, router).then(() => {
      next()
    })
  })

  app.mount('#app')
})
