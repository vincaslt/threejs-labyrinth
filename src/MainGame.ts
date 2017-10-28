import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { BasicGame } from './BasicGame'
import { MovementManager } from './MovementManager'
import { LightGenerator } from './LightGenerator'
import { ExplodingCube } from './ExplodingCube'
// import { BoxWallGenerator } from './BoxWallGenerator'
import { MeshWallGenerator } from './MeshWallGenerator'

export class MainGame extends BasicGame {
  movement: MovementManager
  walls: THREE.Mesh[]
  ddchd: ExplodingCube

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.camera.position.x = 170
    this.camera.position.y = 7
    this.camera.position.z = 320
    this.movement = new MovementManager(this.camera, this.scene)
    this.buildScene()
  }

  buildScene() {
    const mazeLines = getMaze(2, 1)

    this.ddchd = new ExplodingCube()
    const ddchdObj = this.ddchd.getObject()
    ddchdObj.position.x = 152
    ddchdObj.position.y = 7
    ddchdObj.position.z = 245

    const wallGenerator = new MeshWallGenerator(mazeLines, 15)
    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 20)

    const floor = wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    const ceiling = wallGenerator.generateCeiling(getFloorDiagonal(mazeLines))
    this.walls = wallGenerator.generateWalls()
    const lights = LightGenerator.generateLights()

    this.scene.add(...this.walls, ceiling, floor, ambientLight, ...lights, ddchdObj)
  }

  render() {
    this.movement.render(this.walls)
    const ddchdObj = this.ddchd.getObject()
    if (this.camera.position.distanceTo(ddchdObj.position) < 10) {
      this.ddchd.explode(this.scene)
    }
    this.ddchd.render(this.scene)
  }

  update() {}
}