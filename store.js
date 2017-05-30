const key = require('keymaster')
const slides = require('./assets/slides.json')

const ls = window.localStorage

function store (state, bus) {
  state.slides = slides
  state.currentSlide = parseInt(ls.getItem('currentSlide') || 1, 10)
  state.isFollowing = false
  state.message = undefined

  function emit (...args) { bus.emit(...args) }
  function render () { emit('render') }

  bus.on('previousSlide', () => {
    emit('changeSlide', state.currentSlide - 1)
  })

  bus.on('nextSlide', () => {
    emit('changeSlide', state.currentSlide + 1)
  })

  bus.on('changeSlide', num => {
    if (num > 0 && num <= state.slides.length) {
      state.currentSlide = num
      if (!state.isFollowing) {
        ls.setItem('currentSlide', state.currentSlide)
      }
      render()
    }
  })

  bus.on('message', msg => {
    emit('clearMessage')
    state.message = msg
    render()
  })

  bus.on('clearMessage', () => {
    state.message = undefined
    render()
  })

  bus.on('toggleFollow', () => {
    if (state.isFollowing) {
      window.removeEventListener('storage', storageChanged)
      state.isFollowing = false
      emit('message', 'Following disabled')
    } else {
      window.addEventListener('storage', storageChanged)
      state.isFollowing = true
      emit('changeSlide', ls.getItem('currentSlide'))
      emit('message', 'Following enabled')
    }
  })

  bus.on('togglePresenter', () => {
    if (window.location.pathname === '/presenter') {
      emit('pushState', '/')
    } else {
      emit('pushState', '/presenter')
    }
  })

  key('⇧+f', 'presentation', e => { emit('toggleFollow') })

  key('left', e => {
    if (!state.isFollowing) {
      emit('previousSlide')
    }
  })
  key('right, space', e => {
    if (!state.isFollowing) {
      emit('nextSlide')
    }
  })

  key('⇧+p', e => { emit('togglePresenter') })

  // after a bit focus the body so it's more likely the arrow keys work
  setTimeout(() => {
    document.body.focus()
  }, 50)

  function storageChanged (e) {
    if (e.key === 'currentSlide') {
      emit('changeSlide', e.newValue)
    }
  }
}

module.exports = store
