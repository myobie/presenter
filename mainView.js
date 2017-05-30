const bodyView = require('./bodyView')
const fullscreenView = require('./fullscreenView')
const messageView = require('./messageView')
const slideView = require('./slideView')
const key = require('keymaster')

function view (state, emit) {
  key.setScope('presentation')

  const slide = state.slides[state.currentSlide - 1]

  return bodyView([
    fullscreenView([slideView(slide, emit)], emit),
    messageView(state, emit)
  ])
}

module.exports = view
