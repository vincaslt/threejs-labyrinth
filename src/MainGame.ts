import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { BasicGame, GameConfig } from './BasicGame'
import { MovementManager } from './MovementManager'
import { LightGenerator } from './LightGenerator'
import { ExplodingCube } from './ExplodingCube'
import { AbstractWallGenerator } from './AbstractWallGenerator'

export class MainGame extends BasicGame {
  wallGenerator: AbstractWallGenerator
  movement: MovementManager
  walls: THREE.Mesh[]
  ddchd: ExplodingCube

  constructor(config: GameConfig, wallGenerator: AbstractWallGenerator) {
    super(config)
    this.wallGenerator = wallGenerator

    this.init()
    this._render()
  }

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
    ddchdObj.position.x = 175
    ddchdObj.position.y = 7
    ddchdObj.position.z = 6

    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 20)

    const floor = this.wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    const ceiling = this.wallGenerator.generateCeiling(getFloorDiagonal(mazeLines))
    this.walls = this.wallGenerator.generateWalls(mazeLines)
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