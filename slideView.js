const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :host img {
    margin: 0 auto;
    vertical-align: middle;
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .portrait img {
    height: auto;
    width: 100%;
  }

  .landscape img {
    height: 100%;
    width: auto;
  }
`

function view (slide, emit) {
  return html`
    <p class=${prefix}>
      <img alt="" src=${slide.path}>
    </p>
  `
}

module.exports = view
