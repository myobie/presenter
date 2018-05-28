const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    flex: none;
    height: 58px;
    display: block;
    margin: 0;
    padding: 12px 20px 5px;
    font-weight: 200;
    font-size: 48px;
    line-height: 1;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
  }
`

const id = 'the-clock'

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(store)
app.route('*', view)

const tree = app.start()

function view (state, emit) {
  return html`
    <p class=${prefix}>
      ${state.time}
    </p>
  `
}

function currentTimeString () {
  const now = new Date()

  let hours = now.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }

  let minutes = now.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}`
}

function store (state, bus) {
  state.time = currentTimeString()

  function emit (...args) { bus.emit(...args) }
  function render () { emit('render') }

  bus.on('clock:update', time => {
    if (state.time !== time) {
      state.time = time
      render()
    }
  })

  setInterval(() => {
    const time = currentTimeString()
    if (state.time !== time) {
      emit('clock:update', time)
    }
  }, 5000)
}

module.exports = () => {
  const el = html`<div id=${id}></div>`
  el.appendChild(tree)
  return el
}
