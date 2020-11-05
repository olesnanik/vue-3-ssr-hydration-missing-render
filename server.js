const path = require('path')
const fs = require('fs')
const express = require('express')
const { renderToString } = require('@vue/server-renderer')
const serverManifest = require('./dist/server/manifest.json')

const server = express()

const appPath = path.join(__dirname, '/dist/server', serverManifest['app.js'])
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, '/dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, '/dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, '/dist/client', 'css')))

server.get(['/*'], async (req, res) => {
  const app = await createApp({ url: req.url })
  let appContent = await renderToString(app)

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    html = html.toString().replace('SSR_APP_CONTENT', `${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

console.log(`
  You can navigate to http://localhost:80
`)

server.listen(80)
