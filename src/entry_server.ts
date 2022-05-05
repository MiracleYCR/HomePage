import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

function renderLinks (modules: any, manifest: any) {
  let links = ''
  modules.forEach((id: any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        links += renderPreloadLink(file)
      })
    }
  })

  return links
}

function renderPreloadLink (file: any) {
  const extName = file.slice(file.lastIndexOf('.'))
  switch (extName) {
    case '.js':
      return `<link rel="modulepreload" crossorigin href="${file}">`
    case '.css':
      return `<link rel="stylesheet" href="${file}">`
    case '.woff':
      return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    case '.woff2':
      return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    case '.gif':
      return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    case '.jpg':
      return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    case '.jpeg':
      return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    case '.png':
      return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    default:
      return ''
  }
}

export async function render (url: string, manifest: any) {
  const { app, router, store } = createApp()

  await router.push(url)
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched.flatMap(record =>
    Object.values(record.components)
  )

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

  const context: any = {}
  const appHtml = await renderToString(app, context)
  const state = store.state

  // 生产环境下需要进行 css 图片等资源的预加载
  if (import.meta.env.PROD) {
    const preloadLinks = renderLinks(context.modules, manifest)
    return { appHtml, state, preloadLinks }
  } else {
    return { appHtml, state, preloadLinks: '' }
  }
}
