const fs = require('fs')
const path = require('path')

const express = require('express')
const serverStatic = require('serve-static')
const { createServer: createViteServer } = require('vite')

const isProd = process.env.NODE_ENV === 'production'

async function createServer () {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })

  if (!isProd) {
    // development
    app.use(vite.middlewares)
  } else {
    // production
    app.use(serverStatic(path.resolve(__dirname, 'dist/client')))
  }

  app.use('*', async (req, res, next) => {
    let render
    let template
    const url = req.originalUrl

    try {
      if (!isProd) {
        // 1. 读取 index.html
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )

        // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端
        template = await vite.transformIndexHtml(url, template)

        // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
        render = (await vite.ssrLoadModule('/src/entry_server.ts')).render
      } else {
        // 1. 读取 index.html
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        )

        render = require('./dist/server/entry_server.js').render
      }

      /**
       *  4 5 6 三个步骤是 生产 和 开发环境相同的步骤
       */

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      const manifest = require('./dist/client/ssr-manifest.json')
      const { appHtml, state, preloadLinks } = await render(url, manifest)

      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--ssr-output-->', appHtml)
        .replace("'<!--vuex-state-->'", JSON.stringify(state))

      // 6. 返回渲染后的 HTML。
      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(3000, () => {
    console.log(
      `${
        isProd ? 'production' : 'development'
      }: server is running on http://localhost:3000`
    )
  })
}

createServer()
