import * as THREE from 'three'
import { BasicGame, GameConfig } from './BasicGame'

export class MainGame extends BasicGame {
  cube: THREE.Object3D

  constructor(config: GameConfig) {
    super(config)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.buildScene()
  }

  buildScene() {
    this.camera.position.z = 5
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }

  render() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
  }
}