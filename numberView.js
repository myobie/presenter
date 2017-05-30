const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    margin: 0;
    padding: 0;
    border-radius: 50%;
    line-height: 38px;
    height: 38px;
    width: 38px;
    position: absolute;
    top: -19px;
    right: -19px;
    color: white;
    background: black;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
`

function view (number) {
  return html`
    <p class=${prefix}>${number}</p>
  `
}

module.exports = view
