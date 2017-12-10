import * as THREE from 'three'
import { AbstractCamera } from './AbstractCamera'

const CENTER = new THREE.Vector3(160, 100, 160)
const velocity = new THREE.Vector3(1, 1, 1)

export class DollyCamera extends AbstractCamera {
  threeJsCamera: THREE.PerspectiveCamera
  direction: THREE.Vector3 = new THREE.Vector3()
  forward: boolean = true

  constructor(target?: THREE.Object3D) {
    super(target)

    this.threeJsCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 10000)
    this.threeJsCamera.position.set(
      CENTER.x,
      CENTER.y,
      CENTER.z
    )
  }

  update(scene) {
    this.threeJsCamera.lookAt(this.target.position)

    if (this.forward) {
      this.direction.subVectors(this.target.position, this.threeJsCamera.position).normalize()
      this.threeJsCamera.position.add(this.direction.multiply(velocity))
      this.threeJsCamera.fov += 1

      if (this.threeJsCamera.position.distanceTo(CENTER) >= 70) {
        this.forward = false
      }
    } else {
      this.direction.subVectors(CENTER, this.threeJsCamera.position).normalize()
      this.threeJsCamera.position.add(this.direction.multiply(velocity))
      this.threeJsCamera.fov -= 1

      if (this.threeJsCamera.position.distanceTo(CENTER) <= 3) {
        this.forward = true
      }
    }

    this.threeJsCamera.updateProjectionMatrix()
  }
}