const choo = require('choo')

if (process.env.NODE_ENV !== 'production') {
  const devtools = require('choo-devtools')
  choo.use(devtools)
}

const store = require('./store')
const mainView = require('./mainView')
const presenterView = require('./presenterView')
const app = choo({
  history: true
})

app.use(store)

app.route('/', mainView)
app.route('presenter', presenterView)

app.mount('body')
