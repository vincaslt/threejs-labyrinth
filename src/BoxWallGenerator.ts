import * as THREE from 'three'
import { AbstractWallGenerator } from './AbstractWallGenerator'

const THICK = 2

export class BoxWallGenerator extends AbstractWallGenerator {
  fillerPositions: { x: number, z: number }[] = []

  generateFiller(line: Line, onStart = false) {
    const cpr = onStart ? Math.min : Math.max
    const x = cpr(line.x1, line.x2) + THICK / 2
    const z = cpr(line.y1, line.y2) + THICK / 2
    const fillerExists = this.fillerPositions.find(filler => {
      return filler.x === x && filler.z === z
    })

    const fillerIntersects = this.lines.some(line => {
      const wallEndX = Math.max(line.x1, line.x2)
      const wallStartX = Math.min(line.x1, line.x2)
      const wallEndZ = Math.max(line.y1, line.y2)
      const wallStartZ = Math.min(line.y1, line.y2)
      return (line.y1 === line.y2 && line.y1 === z - THICK / 2 && wallStartX < x - THICK / 2 && x - THICK / 2 < wallEndX) ||
        (line.x1 === line.x2 && line.x1 === x - THICK / 2 && wallStartZ < z - THICK / 2 && z - THICK / 2 < wallEndZ)
    })

    if (!fillerExists && !fillerIntersects) {
      const geom = new THREE.BoxGeometry(
        THICK,
        this.wallHeight,
        THICK,
        5, 5, 5
      )
      const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa })
      const filler = new THREE.Mesh(geom, material)
      filler.position.x = x
      filler.position.z = z
      filler.position.y = 0 + this.wallHeight / 2
      this.fillerPositions.push({ x, z })
      return filler
    }

    return undefined
  }

  generateWall(line: Line) {
    let w = Math.abs(line.x2 - line.x1) + THICK
    let l = Math.abs(line.y2 - line.y1) + THICK
    let x = Math.min(line.x1, line.x2) + w / 2
    let z = Math.min(line.y1, line.y2) + l / 2
    const geom = new THREE.BoxGeometry(
      Math.max(w - THICK * 2, THICK),
      this.wallHeight,
      Math.max(l - THICK * 2, THICK)
    )
    const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa })
    const wall = new THREE.Mesh(geom, material)
    wall.position.x = x
    wall.position.y = 0 + this.wallHeight / 2
    wall.position.z = z

    return [wall, this.generateFiller(line, true), this.generateFiller(line)]
  }
}