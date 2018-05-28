#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { inspect } = require('util')

const cwd = process.cwd()
debug(`cwd: ${cwd}`)

const libDir = path.normalize(path.join(__dirname, '..'))
debug(`lib dir: ${libDir}`)

try {
  process.chdir(libDir)
} catch (e) {
  console.error('Cannot find the present.js library directory')
  process.exit(1)
}

const slidesPath = path.join(cwd, 'slides.json')

try {
  fs.statSync(slidesPath)
} catch (e) {
  console.error('Cannot find a slides.json in the current directory')
  process.exit(1)
}

const slidesJSON = fs.readFileSync(slidesPath)
try {
  const slides = JSON.parse(slidesJSON)
  debug(inspect(slides))
} catch (e) {
  console.error("Couldn't understand the slides.json file")
  process.exit(1)
}

const start = require(path.join(libDir, 'server'))
start(cwd)

function debug (msg) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(msg)
  }
}
