const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    position: fixed;
    right: 0;
    bottom: 10%;
    left: 0;
    text-align: center;
    animation: fadeout 5s ease-out;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  :host p {
    display: inline-block;
    width: auto;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.6);
    color: rgba(255, 255, 255, 0.9);
    padding: 12px 18px;
    border-radius: 50px;
  }

  @keyframes fadeout {
    100% { opacity: 0; }
    75% { opacity: 1; }
    0% { opacity: 1; }
  }
`

function view (state, emit) {
  if (state.message) {
    let el = html`
      <div class=${prefix}>
        <p>${state.message}</p>
      </div>
    `

    el.addEventListener('animationend', _ => {
      emit('log:info', 'animationend')
      emit('clearMessage')
    })

    return el
  }
}

module.exports = view
