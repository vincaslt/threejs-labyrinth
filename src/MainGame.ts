import * as THREE from 'three'
import { BasicGame } from './BasicGame'

export class MainGame extends BasicGame {
  cube: THREE.Object3D
  moving: boolean

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    document.addEventListener('keydown', (e) => {
      this.moving = true
    })

    document.addEventListener('keyup', (e) => {
      this.moving = false
    })
    this.buildScene()
  }

  buildScene() {
    this.camera.position.z = 5
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }

  render() {}

  update() {
    this.cube.translateOnAxis(new THREE.Vector3(0, 0, -1), 0.01)
    if (this.moving) {
      this.camera.translateOnAxis(new THREE.Vector3(0, 0, -1), 0.03)
    }
  }
}