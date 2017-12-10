import * as THREE from 'three'
import { createPath } from './path'
import * as ballImg from './ball.jpg'

const MOVEMENT_SPEED = 1
const velocity = new THREE.Vector3(MOVEMENT_SPEED, MOVEMENT_SPEED, MOVEMENT_SPEED)

export class RollingBall {
  ball: THREE.Object3D
  scene: THREE.Scene
  path: THREE.Vector3[]
  activePoint = 0
  direction: THREE.Vector3

  constructor(scene: THREE.Scene) {
    const ballGeometry = new THREE.SphereGeometry(3, 30, 30)
    const texture = new THREE.TextureLoader().load(ballImg)
    const ballMaterial = new THREE.MeshPhongMaterial({ map: texture })
    this.ball = new THREE.Mesh(ballGeometry, ballMaterial)
    this.ball.position.set(170, 3, 295)

    this.scene = scene
    this.scene.add(this.ball)

    this.path = createPath().map(p => new THREE.Vector3(p.x, p.y, p.z))
    this.direction = new THREE.Vector3()
  }

  move() {
    const point = this.path[this.activePoint]
    if (!point) return

    this.direction.subVectors(point, this.ball.position).normalize()
    this.ball.rotateZ(this.direction.x * -20 * Math.PI / 180)
    this.ball.rotateX(this.direction.z * 20 * Math.PI / 180)

    if (point.distanceTo(this.ball.position) < MOVEMENT_SPEED) {
      this.ball.position.set(point.x, point.y, point.z)
      var mx = new THREE.Matrix4().lookAt(this.ball.position, point, new THREE.Vector3(0, 1, 0))
      this.ball.quaternion.setFromRotationMatrix(mx)
      this.activePoint += 1
      return
    } else {
      this.ball.position.add(this.direction.multiply(velocity))
    }
  }
}