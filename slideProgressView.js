const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    display: block;
    margin: 0;
    padding: 0;
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #FF4545;
    transition: width 0.5s;
  }
`

function view (state) {
  const ratio = ((state.currentSlide - 1) % state.slides.length) / state.slides.length
  const percentage = (ratio * 100.0) + 0.5
  const style = `width: ${percentage}%`

  return html`
    <span class=${prefix} style=${style}></span>
  `
}

module.exports = view
