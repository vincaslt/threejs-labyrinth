import * as THREE from 'three'
import { AbstractWallGenerator } from './AbstractWallGenerator'

export class MeshWallGenerator extends AbstractWallGenerator {
  generateWall(line: Line) {
    const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide })
    const w = Math.abs(Math.max(line.x1, line.x2) - Math.min(line.x1, line.x2))
    const l = Math.abs(Math.max(line.y1, line.y2) - Math.min(line.y1, line.y2))
    const geom = new THREE.PlaneGeometry(Math.max(w, l), this.wallHeight, 10, 10)
    const wall = new THREE.Mesh(geom, material)
    if (l > w) {
      wall.rotateY(Math.PI / 2)
    }
    wall.position.x = line.x1 + w / 2
    wall.position.y = 0 + this.wallHeight / 2
    wall.position.z = line.y1 + l / 2

    return [wall]
  }
}