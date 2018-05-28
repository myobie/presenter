const bankai = require('bankai/http')
const http = require('http')
const path = require('path')
const { inspect } = require('util')

const bankaiHandler = bankai(path.join(__dirname, 'app.js'))
const createStaticFileHandler = require('./static-file')

bankaiHandler.compiler.on('error', e => {
  console.error('Error in the compiler')
  console.error(e)
  console.error(inspect(e))
})

function start (staticDir, port = 8080) {
  const staticFileHandler = createStaticFileHandler(staticDir)

  const compiler = (req, res) => {
    bankaiHandler(req, res, () => {
      // all else fails it's a 404
      res.writeHead(404)
      res.end('not found')
    })
  }

  const server = http.createServer((req, res) => {
    try {
      // try to find a static file and fall back to the app compiler
      staticFileHandler(req, res, compiler)
    } catch (e) {
      res.writeHead(500)
      res.end()
      console.error(e.stack)
    }
  })

  server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })

  return server
}

module.exports = start
