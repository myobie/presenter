const choo = require('choo')
const chooLog = require('choo-log')

const store = require('./store')
const mainView = require('./mainView')
const presenterView = require('./presenterView')
const app = choo({
  history: true
})

window.localStorage.setItem('logLevel', 'debug')

app.use(chooLog())
app.use(store)

app.route('/', mainView)
app.route('presenter', presenterView)

app.mount('body')
