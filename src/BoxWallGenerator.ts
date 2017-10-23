import * as THREE from 'three'
import { AbstractWallGenerator } from './AbstractWallGenerator'

export class BoxWallGenerator extends AbstractWallGenerator {
  wallHeight: number

  constructor(wallHeight = 1) {
    super()
    this.wallHeight = wallHeight
  }

  generateWall(line: Line) {
    const w = Math.abs(line.x2 - line.x1) + 0.2
    const l = Math.abs(line.y2 - line.y1) + 0.2
    const geom = new THREE.BoxGeometry(w, this.wallHeight * 2, l)
    const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide })
    const wall = new THREE.Mesh(geom, material)
    wall.position.x = Math.min(line.x1, line.x2) + w / 2
    wall.position.z = Math.min(line.y1, line.y2) + l / 2
    return wall
  }

  generateCeiling(diagonal: Line) {
    return this.generatePlain(diagonal, this.wallHeight, 0xcece22)
  }

  generateFloor(diagonal: Line) {
    return this.generatePlain(diagonal)
  }

  generatePlain(diagonal: Line, y = 0, color: number = 0x333333) {
    const geom = new THREE.Geometry()
    geom.vertices.push(new THREE.Vector3(diagonal.x1, y, diagonal.y1))
    geom.vertices.push(new THREE.Vector3(diagonal.x2, y, diagonal.y1))
    geom.vertices.push(new THREE.Vector3(diagonal.x2, y, diagonal.y2))

    geom.vertices.push(new THREE.Vector3(diagonal.x1, y, diagonal.y1))
    geom.vertices.push(new THREE.Vector3(diagonal.x1, y, diagonal.y2))
    geom.vertices.push(new THREE.Vector3(diagonal.x2, y, diagonal.y2))
    geom.faces.push(new THREE.Face3(0, 1, 2))
    geom.faces.push(new THREE.Face3(3, 4, 5))
    geom.computeFaceNormals()
    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
    return new THREE.Mesh(geom, material)
  }
}