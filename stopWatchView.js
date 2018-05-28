const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')
const key = require('keymaster')

const prefix = css`
  :host {
    position: relative;
  }

  .time {
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
    position: relative;
    overflow: hidden;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #FF4545;
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: -24px;
  }

  .progress {
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #FF4545;
    transition: width 0.5s;
  }
`

const id = 'the-stop-watch'

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(store)
app.route('*', view)
const tree = app.start()

function view (state, emit) {
  return html`
    <div class=${prefix}>
      ${indicatorView(state)}
      ${timeView(state)}
    </div>
  `
}

function indicatorView (state) {
  if (state.startedAt) {
    return html`
      <span class="indicator"></span>
    `
  }
}

function timeView (state) {
  return html`
    <p class="time">
      ${state.currentElapsedTime}
      ${progressView(state)}
    </p>
  `
}

function progressView (state) {
  if (state.startedAt) {
    const style = `width: ${state.progress}`
    return html`
      <span class="progress" style=${style}></span>
    `
  }
}

function now () {
  return (new Date()).getTime()
}

function store (state, bus) {
  state.startedAt = undefined
  state.previousElapsedSeconds = 0
  state.currentElapsedTime = '00:00'
  state.progress = '0%'

  function emit (...args) { bus.emit(...args) }
  function render () { emit('render') }

  bus.on('stopwatch:update', render)
  bus.on('stopwatch:toggle', toggle)
  bus.on('stopwatch:start', start)
  bus.on('stopwatch:pause', pause)
  bus.on('stopwatch:reset', reset)

  function toggle () {
    if (state.startedAt) {
      pause()
    } else {
      start()
    }
  }

  function start () {
    state.startedAt = now()
    render()
  }

  function pause () {
    state.previousElapsedSeconds = state.previousElapsedSeconds + elapsedSeconds()
    state.startedAt = undefined
    state.currentElapsedTime = elapsedTime()
    render()
  }

  function reset () {
    state.previousElapsedSeconds = 0
    if (state.startedAt) { state.startedAt = now() }
    state.currentElapsedTime = '00:00'
    render()
  }

  function elapsedSeconds () {
    if (state.startedAt) {
      return Math.floor((now() - state.startedAt) / 1000.0)
    } else {
      return 0
    }
  }

  function totalSeconds () {
    return state.previousElapsedSeconds + elapsedSeconds()
  }

  function progress () {
    const ratio = (totalSeconds() % 60.0) / 60.0
    const percentage = Math.floor(ratio * 100.0) + 1
    return `${percentage}%`
  }

  function elapsedTime () {
    let totalMinutes = Math.floor(totalSeconds() / 60.0)
    let totalHours = Math.floor(totalMinutes / 60.0)

    totalMinutes = totalMinutes - (totalHours * 60)

    if (totalMinutes < 10) {
      totalMinutes = `0${totalMinutes}`
    }

    if (totalHours < 10) {
      totalHours = `0${totalHours}`
    }

    return `${totalHours}:${totalMinutes}`
  }

  setInterval(() => {
    if (state.startedAt) {
      state.progress = progress()
      state.currentElapsedTime = elapsedTime()
      emit('stopwatch:update')
    }
  }, 1000)

  key('⇧+s', 'presenter', e => { emit('stopwatch:toggle') })
  key('⇧+r', 'presenter', e => { emit('stopwatch:reset') })
}

module.exports = () => {
  const el = html`<div id=${id}></div>`
  el.appendChild(tree)
  return el
}
