import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render (url: string) {
  const { app, router, store } = createApp()

  await router.push(url)
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched.flatMap(record =>
    Object.values(record.components)
  )

  console.log(matchedComponents)

  await Promise.all(
    matchedComponents.map((comp: any) => {
      if (comp.asyncData) {
        return comp.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })
  )

  const html = renderToString(app)

  return html
}
