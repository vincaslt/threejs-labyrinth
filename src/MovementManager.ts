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

    const cameraGeo = new THREE.SphereGeometry(1.275)
    cameraGeo.computeBoundingSphere()
    const cameraSphere = new THREE.Mesh(
      cameraGeo,
      new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide })
    )
    this.camera.add(cameraSphere)
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

  public render(walls: THREE.Mesh[]) {
    const prevPos = this.camera.position.clone()
    this.camera.translateZ(this.movement.down - this.movement.up)
    this.camera.translateX(this.movement.right - this.movement.left)
    this.camera.rotateY(this.movement.rotateLeft - this.movement.rotateRight)
    const nextPos = this.camera.position.clone()

    const cameraBounds = new THREE.Sphere(
      nextPos,
      (this.camera.children[0] as THREE.Mesh).geometry.boundingSphere.radius
    )

    const intersects = walls.some((wall, i) => {
      const boundingBox = wall.geometry.boundingBox.clone()
      const wallPos = wall.position.clone()
      boundingBox.max.applyEuler(wall.rotation).add(wallPos)
      boundingBox.min.applyEuler(wall.rotation).add(wallPos)
      return boundingBox.intersectsSphere(cameraBounds)
    })

    if (intersects) {
      this.camera.position.copy(prevPos)
    } else {
      this.camera.position.copy(nextPos)
    }
  }
}