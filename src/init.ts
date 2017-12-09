import { MainGame } from './MainGame'

const init = () => {
  new MainGame({ fps: 60, width: window.innerWidth, height: window.innerHeight })
}

init()