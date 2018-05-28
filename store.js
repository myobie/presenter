const key = require('keymaster')
const ls = window.localStorage
const fetch = window.fetch

function store (state, bus) {
  state.isReady = false
  state.slides = []
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

  bus.on('replaceSlides', newSlides => {
    state.slides = newSlides
    emit('changeSlide', state.currentSlide)
    render()
  })

  bus.on('reloadSlides', () => {
    emit('message', 'Reloading slides...')

    fetch('/slides.json')
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      })
      .then(res => res.json())
      .then(json => {
        emit('message', 'Slided successfully reloaded')
        emit('replaceSlides', json)
      })
      .catch(e => {
        emit('message', 'Slided could not be reloaded 😓')
        console.error('fetching slides.json failed')
        console.error(e)
      })
  })

  bus.on('changeSlide', num => {
    let newCurrentSlide

    if (num > 0 && num <= state.slides.length) {
      newCurrentSlide = num
    } else if (num <= 0) {
      newCurrentSlide = 1
    } else {
      if (state.slides.length > 0) {
        newCurrentSlide = state.slides.length
      } else {
        newCurrentSlide = 1
      }
    }

    state.currentSlide = newCurrentSlide

    if (!state.isFollowing) {
      ls.setItem('currentSlide', state.currentSlide)
    }

    render()
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

  key('r', e => { emit('reloadSlides') })

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

  emit('reloadSlides')

  function storageChanged (e) {
    if (e.key === 'currentSlide') {
      emit('changeSlide', e.newValue)
    }
  }
}

module.exports = store
