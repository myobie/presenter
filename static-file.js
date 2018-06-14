const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime/lite')

function createStaticFileHandler (baseDir) {
  return (req, res, next) => {
    let reqURL = url.parse(req.url)
    let localPath = baseDir + path.normalize(reqURL.pathname)

    fs.stat(localPath, (err, stats) => {
      if (err) {
        notFound()
      } else {
        if (stats.isDirectory()) {
          serve(`${localPath}/index.html`)
        } else {
          serve(localPath)
        }
      }
    })

    function notFound () {
      if (next) {
        next(req, res)
      } else {
        res.writeHead(404)
        res.end('not found')
      }
    }

    function serve (aPath) {
      const mimeType = mime.getType(aPath)

      const stream = fs.createReadStream(aPath, { bufferSize: 64 * 1024 })
      stream.pipe(res)
      stream.on('open', () => {
        if (mimeType) {
          res.setHeader('Content-type', mimeType)
        } else {
          res.setHeader('Content-type', 'application/octet-stream')
        }
      })
      stream.on('error', e => {
        notFound()
      })
    }
  }
}

module.exports = createStaticFileHandler
