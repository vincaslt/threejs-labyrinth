import * as THREE from 'three'
import { AbstractCamera } from './AbstractCamera'
import { Vector3 } from 'three'

const lookahead = new Vector3(15, 15, 15)

export class FollowCamera extends AbstractCamera {
  direction: THREE.Vector3
  viewTarget: THREE.Vector3

  constructor() {
    super()

    this.threeJsCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
  }

  addDirectionVector(direction: THREE.Vector3) {
    this.direction = direction
  }

  update(scene) {
    this.viewTarget = this.target.position.clone().add(this.direction.clone().multiply(lookahead))

    if (this.direction && this.direction.length() > 0) {
      const mx = new THREE.Matrix4().lookAt(
        this.threeJsCamera.position,
        this.viewTarget,
        new THREE.Vector3(0, 1, 0))
      const endQuaternion = new THREE.Quaternion().setFromRotationMatrix(mx)

      this.threeJsCamera.quaternion.slerp(endQuaternion, 0.1)
    }

    if (this.target) {
      this.threeJsCamera.position.set(
        this.target.position.x,
        this.target.position.y + 4.5,
        this.target.position.z
      )
    }
  }
}