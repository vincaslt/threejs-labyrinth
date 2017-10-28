import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { BasicGame } from './BasicGame'
import { MovementManager } from './MovementManager'
import { LightGenerator } from './LightGenerator'
import { ExplodingCube } from './ExplodingCube'
import { BoxWallGenerator } from './BoxWallGenerator'
// import { MeshWallGenerator } from './MeshWallGenerator'

export class MainGame extends BasicGame {
  movement: MovementManager
  walls: THREE.Mesh[]
  wallLines: Line[]

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
    this.wallLines = mazeLines

    const ddchd = new ExplodingCube().getObject()
    ddchd.position.x = 170
    ddchd.position.y = 7
    ddchd.position.z = 315

    const wallGenerator = new BoxWallGenerator(mazeLines, 15)
    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 20)

    const floor = wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    const ceiling = wallGenerator.generateCeiling(getFloorDiagonal(mazeLines))
    this.walls = wallGenerator.generateWalls()
    const lights = LightGenerator.generateLights()

    this.scene.add(...this.walls, ceiling, floor, ambientLight, ...lights, ddchd)
  }

  render() {
    this.movement.render(this.walls, this.wallLines, 5)
  }

  update() {}
}