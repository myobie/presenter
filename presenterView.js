const html = require('choo/html')
const css = require('sheetify')
const bodyView = require('./bodyView')
const slideView = require('./slideView')
const numberView = require('./numberView')
const slideProgressView = require('./slideProgressView')
const clockView = require('./clockView')
const stopWatchView = require('./stopWatchView')
const key = require('keymaster')

const prefix = css`
  :host {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .gutter {
    width: 5%;
    flex: none;
  }

  .top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 70px;
    flex: 1 1;
  }

  .middle {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .slide {
    position: relative;
    flex: 1 1;
  }

  .empty-slide {
    margin: 0;
    height: 100%;
    width: 100%;
    background: black;
  }

  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 70px;
    flex: 1 1;
  }
`

function view (state, emit) {
  key.setScope('presenter')

  return bodyView([
    html`
      <div class=${prefix}>
        <div class="top">
          <div class="gutter"></div>
          ${clockView()}
          <div class="gutter"></div>
          ${stopWatchView()}
          <div class="gutter"></div>
        </div>
        <div class="middle">
          <div class="gutter"></div>
          <div class="current slide">
            ${currentSlide(state, emit)}
          </div>
          <div class="gutter"></div>
          <div class="next slide">
            ${nextSlide(state, emit)}
          </div>
          <div class="gutter"></div>
        </div>
        <div class="bottom">
          ${slideProgressView(state)}
        </div>
      </div>
    `
  ])
}

function currentSlide (state, emit) {
  const slide = state.slides[state.currentSlide - 1]
  return [slideView(slide, emit), numberView(slide.number)]
}

function nextSlide (state, emit) {
  const slide = state.slides[state.currentSlide]

  if (slide) {
    return [slideView(slide, emit), numberView(slide.number)]
  } else {
    return html`
      <div class="empty-slide">&nbsp;</div>
    `
  }
}

module.exports = view
