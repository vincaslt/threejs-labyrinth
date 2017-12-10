import { MainGame } from './MainGame'

const init = () => {
  new MainGame({
    fps: 144,
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: false
  })
}

init()