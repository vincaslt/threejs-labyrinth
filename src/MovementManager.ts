import * as THREE from 'three'

interface Directions {
  up: number
  down: number
  left: number
  right: number
  rotateLeft: number
  rotateRight: number
}

export class MovementManager {
  camera: THREE.Camera
  movement: Directions = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    rotateLeft: 0,
    rotateRight: 0
  }

  constructor(camera: THREE.Camera) {
    this.camera = camera
    document.addEventListener('keydown', (e) => this.handleKeyPress(e, 1))
    document.addEventListener('keyup', (e) => this.handleKeyPress(e, 0))
  }

  private handleKeyPress = (e: KeyboardEvent, speed: number) => {
    switch (e.key) {
      case 'w':
        this.movement.up = speed
        break
      case 'q':
        this.movement.left = speed
        break
      case 's':
        this.movement.down = speed
        break
      case 'e':
        this.movement.right = speed
        break
      case 'a':
        this.movement.rotateLeft = speed * 0.05
        break
      case 'd':
        this.movement.rotateRight = speed * 0.05
        break
      case 'Enter':
        console.log(this.camera.position.toArray())
        break
    }
  }

  public render() {
    this.camera.translateZ(this.movement.down - this.movement.up)
    this.camera.translateX(this.movement.right - this.movement.left)
    this.camera.rotateY(this.movement.rotateLeft - this.movement.rotateRight)
  }
}