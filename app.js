const choo = require('choo')

const store = require('./store')
const mainView = require('./mainView')
const presenterView = require('./presenterView')

const app = choo({ history: true })

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(store)

app.route('/', mainView)
app.route('presenter', presenterView)

app.mount('body')
