import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { BasicGame } from './BasicGame'
import { MovementManager } from './MovementManager'
import { BoxWallGenerator } from './BoxWallGenerator'
// import { MeshWallGenerator } from './MeshWallGenerator'

export class MainGame extends BasicGame {
  movement: MovementManager

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.y = 3
    this.camera.position.x = 17
    this.camera.position.z = 32
    this.camera.rotateX(-0.5)
    this.movement = new MovementManager(this.camera)
    this.buildScene()
  }

  buildScene() {
    const mazeLines = getMaze(2, 0.1)
    const wallGenerator = new BoxWallGenerator(mazeLines, 1.5)
    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 20)

    const floor = wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    // const ceiling = wallGenerator.generateCeiling(getFloorDiagonal(mazeLines))
    const walls = wallGenerator.generateWalls()

    var sphere = new THREE.SphereGeometry(0.1, 16, 8)
    var light = new THREE.PointLight(0xFF0000, 3, 5)
    light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0000 })))
    light.position.set(0, 0.5, 30)

    this.scene.add(...walls, ...floor, light, ambientLight)
  }

  render() {
    this.movement.render()
  }

  update() {}
}