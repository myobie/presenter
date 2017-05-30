const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

`

function view (children, emit) {
  return html`
    <div class=${prefix}>
      ${children}
    </div>
  `
}

module.exports = view
