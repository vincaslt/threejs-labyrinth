import * as THREE from 'three'
import { AbstractCamera } from './AbstractCamera'

export class DirectedCamera extends AbstractCamera {

  constructor(target?: THREE.Object3D) {
    super(target)

    this.threeJsCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 10000)
    this.threeJsCamera.position.x = 160
    this.threeJsCamera.position.y = 100
    this.threeJsCamera.position.z = 160
    this.threeJsCamera.rotateX(-90 * Math.PI / 180)
  }

  update(scene) {
    this.threeJsCamera.lookAt(this.target.position)
  }
}