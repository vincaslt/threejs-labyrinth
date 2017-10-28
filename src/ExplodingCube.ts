import * as THREE from 'three'

export class ExplodingCube {
  object: THREE.Mesh
  exploded: boolean
  triangles: THREE.Mesh[]

  constructor(color: number = 0xffee00) {
    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
    const geom = new THREE.DodecahedronGeometry(1, 2)
    geom.computeBoundingBox()
    this.object = new THREE.Mesh(geom, material)
  }

  private generateTriangles(scene: THREE.Scene) {
    const faces = (this.object.geometry as THREE.Geometry).faces.slice()
    this.triangles = faces.map((face) => {
      const geom = new THREE.Geometry()
      geom.vertices.push(
        face.vertexNormals[0],
        face.vertexNormals[1],
        face.vertexNormals[2]
      )
      const f = new THREE.Face3(0, 1, 2)
      f.normal = face.normal.clone()
      geom.faces.push(f)
      geom.computeBoundingBox()
      var mesh = new THREE.Mesh(geom, new THREE.MeshLambertMaterial({
        color: (Math.random() * 255) * (Math.random() * 255) * (Math.random() * 255)
      }))
      mesh.position.copy(this.object.position)
      return mesh
    })
    scene.add(...this.triangles)
  }

  public explode(scene: THREE.Scene) {
    if (!this.exploded) {
      this.exploded = true
      scene.remove(this.object)
      this.generateTriangles(scene)
    }
  }

  public render(scene: THREE.Scene) {
    if (this.exploded) {
      this.triangles.forEach((triangle) => {
        triangle.translateOnAxis((triangle.geometry as THREE.Geometry).faces[0].normal, 0.1)
        const outOfRange = this.object.position.distanceTo(triangle.position) > 10
        if (outOfRange) {
          scene.remove(triangle)
        }
      })
    }
  }

  public getObject() {
    return this.object
  }
}