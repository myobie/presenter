const bodyView = require('./bodyView')
const fullscreenView = require('./fullscreenView')
const messageView = require('./messageView')
const slideView = require('./slideView')
const key = require('keymaster')

function view (state, emit) {
  key.setScope('presentation')

  let slideChildren = []

  if (state.slides.length > 0) {
    const slide = state.slides[state.currentSlide - 1]

    if (slide) {
      slideChildren = [slideView(slide, emit)]
    }
  }

  return bodyView([
    fullscreenView(slideChildren, emit),
    messageView(state, emit)
  ])
}

module.exports = view
