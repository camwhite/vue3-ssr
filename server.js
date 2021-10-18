const fs = require('fs')
const path = require('path')
const express = require('express')
const devalue = require('@nuxt/devalue')

const isTest =
  process.env.NODE_ENV === 'test' ||
  !!process.env.VITE_TEST_BUILD

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const toAbsolute = p => path.resolve(p)
  const resolve = p => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(
        toAbsolute('dist/client/index.html'),
        'utf-8'
      )
    : ''

  const manifest = isProd
    ? require('./dist/client/ssr-manifest.json')
    : {}

  const app = express()

  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr'
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false,
        setHeaders(res, path) {
          if (/sw\.js$/.test(path)) {
            res.setHeader('Cache-Control', 'public, max-age=0')
            res.setHeader('Expires', '-1')
            res.setHeader('Pragma', 'no-cache')
          }
        }
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(
          resolve('index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        render = (
          await vite.ssrLoadModule('/src/entry-server.js')
        ).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      const [appHtml, preloadLinks, pinia] = await render(
        manifest,
        url
      )

      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)
        .replace(
          '<!--store-state-->',
          `
          <script type="text/javascript">
            window.__pinia = ${devalue(pinia.state.value)}
          </script>
          `
        )

      res.set({ 'Content-Type': 'text/html' }).send(html)
    } catch (err) {
      !isProd && vite.ssrFixStacktrace(err)
      res.status(500).send(err.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  ;(async () => {
    try {
      const { app } = await createServer()
      await app.listen(3000)
    } catch (err) {
      console.error(err)
    }
  })()
}

// for test use
exports.createServer = createServer
