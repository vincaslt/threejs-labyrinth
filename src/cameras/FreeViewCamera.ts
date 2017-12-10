import * as THREE from 'three'
import { AbstractCamera } from './AbstractCamera'
import { OrbitControls } from '../vendors/OrbitControls'

export class FreeViewCamera extends AbstractCamera {
  controls: any

  constructor(target?: THREE.Object3D) {
    super(target)

    this.threeJsCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.threeJsCamera.position.x = 170
    this.threeJsCamera.position.y = 50
    this.threeJsCamera.position.z = 340
    this.threeJsCamera.rotateX(-60 * Math.PI / 180)

    this.controls = new OrbitControls(this.threeJsCamera, undefined)
    this.controls.rotateSpeed = 0.02
    this.controls.zoomSpeed = 0.2
    this.controls.keyPanSpeed = 0.02
    this.controls.enableDamping = true
  }

  update(scene) {
    this.controls.update()
  }
}