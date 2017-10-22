import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { BasicGame } from './BasicGame'
import { MovementManager } from './MovementManager'
import { MeshWallGenerator } from './MeshWallGenerator'

export class MainGame extends BasicGame {
  movement: MovementManager

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.y = 0.5
    this.camera.position.x = 17
    this.camera.position.z = 32
    this.movement = new MovementManager(this.camera)
    this.buildScene()
  }

  buildScene() {
    const wallGenerator = new MeshWallGenerator(1.5)
    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 20)
    const mazeLines = getMaze(2, 0.1)

    const floor = wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    const ceiling = wallGenerator.generateCeiling(getFloorDiagonal(mazeLines))
    const walls = mazeLines.map(line => {
      return wallGenerator.generateWall(line)
    })

    this.scene.add(...walls, floor, ceiling, ambientLight)
  }

  render() {}

  update() {
    this.movement.update()
  }
}