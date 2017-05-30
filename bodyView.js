const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: black;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
  }

  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  @font-face { font-family: "SF Mono"; font-weight: 200; font-style: normal; src: url(/assets/fonts/SFMono-Light.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 200; font-style: italic; src: url(/assets/fonts/SFMono-LightItalic.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 400; font-style: normal; src: url(/assets/fonts/SFMono-Regular.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 400; font-style: italic; src: url(/assets/fonts/SFMono-RegularItalic.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 500; font-style: normal; src: url(/assets/fonts/SFMono-Medium.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 500; font-style: italic; src: url(/assets/fonts/SFMono-MediumItalic.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 600; font-style: normal; src: url(/assets/fonts/SFMono-Semibold.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 600; font-style: italic; src: url(/assets/fonts/SFMono-SemiboldItalic.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 700; font-style: normal; src: url(/assets/fonts/SFMono-Bold.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 700; font-style: italic; src: url(/assets/fonts/SFMono-BoldItalic.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 800; font-style: normal; src: url(/assets/fonts/SFMono-Heavy.otf); }
  @font-face { font-family: "SF Mono"; font-weight: 800; font-style: italic; src: url(/assets/fonts/SFMono-HeavyItalic.otf); }
`

let aspect = ''

function view (children, emit) {
  let classes = [aspect, prefix].join(' ')
  return html`
    <body class=${classes} onload=${e => setTimeout(resize, 30)}>
      ${children}
    </body>
  `
}

window.onresize = () => { resize() }

function resize () {
  const el = document.body
  const aspectRatio = window.innerWidth / window.innerHeight
  if (aspectRatio < 16 / 9) {
    aspect = 'portrait'
    el.className = [prefix, aspect].join(' ')
  } else {
    aspect = 'landscape'
    el.className = [prefix, aspect].join(' ')
  }
}

module.exports = view
