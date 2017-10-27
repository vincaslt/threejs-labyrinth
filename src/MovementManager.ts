import * as THREE from 'three'
import { intersect } from './lineIntersector'

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
  scene: THREE.Scene
  movement: Directions = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    rotateLeft: 0,
    rotateRight: 0
  }

  constructor(camera: THREE.Camera, scene: THREE.Scene) {
    this.camera = camera
    this.scene = scene
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

  private checkWallsIntersection(walls: Line[] = [], movementSegment: Line) {
    return walls.some((wall) => {
      return !!intersect(
        wall.x1,
        wall.y1,
        wall.x2,
        wall.y2,
        movementSegment.x1,
        movementSegment.y1,
        movementSegment.x2,
        movementSegment.y2
      )
    })
  }

  public render(walls: Line[] = [], off: number) {
    const prevPos = this.camera.position.clone()
    const prevRot = this.camera.rotation.clone()
    this.camera.translateZ(this.movement.down - this.movement.up)
    this.camera.translateX(this.movement.right - this.movement.left)
    this.camera.rotateY(this.movement.rotateLeft - this.movement.rotateRight)
    const nextPos = this.camera.position.clone()
    const nextRot = this.camera.rotation.clone()
    this.camera.translateZ(off * (this.movement.down - this.movement.up))
    this.camera.translateX(off * (this.movement.right - this.movement.left))
    this.camera.rotateY(off * this.movement.rotateLeft - this.movement.rotateRight)
    const lookahead = this.camera.position.clone()

    if (this.checkWallsIntersection(
      walls,
      {
        x1: prevPos.x,
        y1: prevPos.z,
        x2: lookahead.x,
        y2: lookahead.z
      }
    )) {
      this.camera.position.copy(prevPos)
      this.camera.rotation.copy(prevRot)

    } else {
      this.camera.position.copy(nextPos)
      this.camera.rotation.copy(nextRot)
    }
  }
}