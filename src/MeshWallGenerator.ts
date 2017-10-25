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

    const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide })
    return [new THREE.Mesh(geom, material)]
  }
}