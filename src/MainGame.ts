import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { BasicGame } from './BasicGame'
import { MovementManager } from './MovementManager'
import { LightGenerator } from './LightGenerator'
// import { BoxWallGenerator } from './BoxWallGenerator'
import { MeshWallGenerator } from './MeshWallGenerator'

export class MainGame extends BasicGame {
  movement: MovementManager

  walls: Line[]

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.x = 170
    this.camera.position.y = 7
    // this.camera.position.y = 30
    this.camera.position.z = 320
    // this.camera.rotateX(-0.5)
    this.movement = new MovementManager(this.camera, this.scene)
    this.buildScene()
  }

  buildScene() {
    const mazeLines = getMaze(2, 1)
    this.walls = mazeLines
    const wallGenerator = new MeshWallGenerator(mazeLines, 15)
    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 20)

    const floor = wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    const ceiling = wallGenerator.generateCeiling(getFloorDiagonal(mazeLines))
    const walls = wallGenerator.generateWalls()
    const lights = LightGenerator.generateLights()
    this.scene.add(...walls, ceiling, floor, ambientLight, ...lights)
  }

  render() {
    this.movement.render(this.walls, 5)
  }

  update() {}
}