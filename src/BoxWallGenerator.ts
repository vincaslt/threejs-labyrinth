import * as THREE from 'three'
import { AbstractWallGenerator } from './AbstractWallGenerator'
import * as image1 from './walls/brick-wall.jpg'
import * as image2 from './walls/floor-wood.jpg'
import * as image3 from './walls/metal-floor.jpg'
import * as image4 from './walls/stone-bump.jpg'
import * as image5 from './walls/stone.jpg'

const THICK = 2

const loader = new THREE.TextureLoader()
const texture1 = loader.load(image1)
const texture2 = loader.load(image2)
const texture3 = loader.load(image3)
const texture4 = loader.load(image4)
const texture5 = loader.load(image5)

const material1 = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, map: texture1, overdraw: 5, side: THREE.DoubleSide })
const material2 = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, map: texture2, overdraw: 5, side: THREE.DoubleSide })
const material3 = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, map: texture3, overdraw: 5, side: THREE.DoubleSide })
const material4 = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, map: texture4, overdraw: 5, side: THREE.DoubleSide })
const material5 = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, map: texture5, overdraw: 5, side: THREE.DoubleSide })

export class BoxWallGenerator extends AbstractWallGenerator {
  fillerPositions: { x: number, z: number }[] = []

  generateFiller(line: Line, lines: Line[], onStart = false) {
    const cpr = onStart ? Math.min : Math.max
    const x = cpr(line.x1, line.x2) + THICK / 2
    const z = cpr(line.y1, line.y2) + THICK / 2
    const fillerExists = this.fillerPositions.find(filler => {
      return filler.x === x && filler.z === z
    })

    const fillerIntersects = lines.some(line => {
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
        10, 10, 10
      )

      const filler = new THREE.Mesh(geom, [material1, material2, material3, material4, material5, material4])
      filler.position.x = x
      filler.position.z = z
      filler.position.y = 0 + this.wallHeight / 2
      this.fillerPositions.push({ x, z })
      return filler
    }

    return undefined
  }

  generateWall(line: Line, lines: Line[]) {
    let w = Math.abs(line.x2 - line.x1) + THICK
    let l = Math.abs(line.y2 - line.y1) + THICK
    let x = Math.min(line.x1, line.x2) + w / 2
    let z = Math.min(line.y1, line.y2) + l / 2
    const geom = new THREE.BoxGeometry(
      Math.max(w - THICK * 2, THICK),
      this.wallHeight,
      Math.max(l - THICK * 2, THICK)
    )

    const wall = new THREE.Mesh(geom, [material1, material2, material3, material4, material5, material4])
    wall.position.x = x
    wall.position.y = 0 + this.wallHeight / 2
    wall.position.z = z

    return [wall, this.generateFiller(line, lines, true), this.generateFiller(line, lines)]
  }
}