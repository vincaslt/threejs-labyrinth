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
    return this.generatePlane(diagonal, this.wallHeight, 0xcece22)
  }

  generateFloor(diagonal: Line) {
    return this.generatePlane(diagonal)
  }

  generatePlane(diagonal: Line, y0 = 0, color: number = 0x888888) {
    const vertices: THREE.Mesh[] = []
    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
    const h = 0.5
    for (let x = Math.min(diagonal.x1, diagonal.x2); x <= Math.max(diagonal.x1, diagonal.x2); x += h) {
      for (let z = Math.min(diagonal.y1, diagonal.y2); z <= Math.max(diagonal.y1, diagonal.y2); z += h) {
        const geom = new THREE.Geometry()
        geom.vertices.push(new THREE.Vector3(x, y0, z))
        geom.vertices.push(new THREE.Vector3(x + h, y0, z))
        geom.vertices.push(new THREE.Vector3(x + h, y0, z + h))

        geom.vertices.push(new THREE.Vector3(x, y0, z))
        geom.vertices.push(new THREE.Vector3(x, y0, z + h))
        geom.vertices.push(new THREE.Vector3(x + h, y0, z + h))

        geom.faces.push(new THREE.Face3(0, 1, 2))
        geom.faces.push(new THREE.Face3(3, 4, 5))
        geom.computeFaceNormals()

        vertices.push(new THREE.Mesh(geom, material))
      }
    }

    return vertices
  }

  public generateWalls(): THREE.Mesh[] {
    const walls: THREE.Mesh[] = []
    this.lines.forEach(line => {
      this.generateWall(line).forEach(wall => {
        if (wall) {
          walls.push(wall)
        }
      })
    })
    return walls
  }
}