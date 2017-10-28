import * as THREE from 'three'

export abstract class AbstractWallGenerator {
  lines: Line[]
  wallHeight: number

  constructor(mazeLines: Line[], wallHeight: number) {
    this.lines = mazeLines
    this.wallHeight = wallHeight
  }
  public abstract generateWall(line: Line): THREE.Mesh[]

  generateCeiling(diagonal: Line) {
    return this.generatePlane(diagonal, this.wallHeight, 0x7f1ae5)
  }

  generateFloor(diagonal: Line) {
    return this.generatePlane(diagonal)
  }

  generatePlane(diagonal: Line, y = 0, color: number = 0x888888) {
    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
    const w = Math.abs(Math.max(diagonal.x1, diagonal.x2) - Math.min(diagonal.x1, diagonal.x2))
    const l = Math.abs(Math.max(diagonal.y1, diagonal.y2) - Math.min(diagonal.y1, diagonal.y2))
    const geom = new THREE.PlaneGeometry(w, l, 30, 30)
    geom.computeBoundingBox()
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    const plane = new THREE.Mesh(geom, material)
    plane.translateOnAxis(new THREE.Vector3(w / 2, y, l / 2), 1)
    plane.receiveShadow = true
    return plane
  }

  public generateWalls(): THREE.Mesh[] {
    const walls: THREE.Mesh[] = []
    this.lines.forEach(line => {
      this.generateWall(line).forEach(wall => {
        if (wall) {
          wall.geometry.computeBoundingBox()
          wall.castShadow = true
          wall.receiveShadow = true
          walls.push(wall)
        }
      })
    })
    return walls
  }
}