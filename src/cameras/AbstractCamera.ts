import * as THREE from 'three'

export abstract class AbstractCamera {
  protected threeJsCamera: THREE.Camera
  target: THREE.Object3D

  constructor(target?: THREE.Object3D) {
    this.target = target
  }

  abstract update(scene: THREE.Scene)

  setTarget(target: THREE.Object3D) {
    this.target = target
  }

  getCamera() {
    return this.threeJsCamera
  }
}