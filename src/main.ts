import { MainGame } from './MainGame'
import { BoxWallGenerator } from './BoxWallGenerator'
import { MeshWallGenerator } from './MeshWallGenerator'

const init = (boxWalls: boolean = false) => {
  const wallGenerator = boxWalls
    ? new BoxWallGenerator(15)
    : new MeshWallGenerator(15)
  new MainGame({ fps: 60, width: window.innerWidth, height: window.innerHeight }, wallGenerator)
}

document.querySelector('#boxWalls input').addEventListener('change', (e) => {
  init((e.target as any).checked)
})

init()