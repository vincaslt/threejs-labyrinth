import * as THREE from 'three'

interface Directions {
  up: number
  down: number
  left: number
  right: number
}

export class MovementManager {
  camera: THREE.Camera
  movement: Directions = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  }

  constructor(camera: THREE.Camera) {
    this.camera = camera
    document.addEventListener('keydown', (e) => this.handleKeyPress(e, 0.05))
    document.addEventListener('keyup', (e) => this.handleKeyPress(e, 0))
  }

  private handleKeyPress = (e: KeyboardEvent, speed: number) => {
    switch (e.key) {
      case 'w':
        this.movement.up = speed
        break
      case 'a':
        this.movement.left = speed
        break
      case 's':
        this.movement.down = speed
        break
      case 'd':
        this.movement.right = speed
        break
    }
  }

  public render() {
    this.camera.translateZ(this.movement.down - this.movement.up)
    this.camera.rotateY(this.movement.left - this.movement.right)
  }
}