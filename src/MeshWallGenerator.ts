import * as THREE from 'three'
import { AbstractWallGenerator } from './AbstractWallGenerator'

export class MeshWallGenerator extends AbstractWallGenerator {
  generateWall(line: Line) {
    const geom = new THREE.Geometry()
    geom.vertices.push(new THREE.Vector3(line.x1, 0, line.y1))
    geom.vertices.push(new THREE.Vector3(line.x2, 0, line.y2))
    geom.vertices.push(new THREE.Vector3(line.x2, this.wallHeight, line.y2))

    geom.vertices.push(new THREE.Vector3(line.x2, this.wallHeight, line.y2))
    geom.vertices.push(new THREE.Vector3(line.x1, this.wallHeight, line.y1))
    geom.vertices.push(new THREE.Vector3(line.x1, 0, line.y1))

    geom.faces.push(new THREE.Face3(0, 1, 2))
    geom.faces.push(new THREE.Face3(3, 4, 5))
    geom.computeFaceNormals()

    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide })
    return [new THREE.Mesh(geom, material)]
  }

  generateCeiling(diagonal: Line) {
    return this.generatePlane(diagonal, this.wallHeight, 0xcece22)
  }

  generateFloor(diagonal: Line) {
    return this.generatePlane(diagonal)
  }

  generatePlane(diagonal: Line, y = 0, color: number = 0x333333) {
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