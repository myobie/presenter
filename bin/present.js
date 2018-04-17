#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { inspect } = require('util')

const slidesPath = path.join(process.cwd(), 'slides.json')

try {
  fs.statSync(slidesPath)
} catch (e) {
  console.error('Cannot find a slides.json in the current directory')
  process.exit(1)
}

const slidesJSON = fs.readFileSync(slidesPath)
try {
  const slides = JSON.parse(slidesJSON)
  console.log(inspect(slides))
} catch (e) {
  console.error("Couldn't understand the slides.json file")
  process.exit(1)
}
