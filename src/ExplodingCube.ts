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
    const pos = this.object.position.clone()
    const faces = (this.object.geometry as THREE.Geometry).faces.slice()
    this.triangles = faces.map((face) => {
      const geom = new THREE.Geometry()
      geom.vertices.push(
        face.vertexNormals[0],
        face.vertexNormals[1],
        face.vertexNormals[2]
      )
      geom.faces.push(new THREE.Face3(0, 1, 2))
      var mesh = new THREE.Mesh(geom, new THREE.MeshLambertMaterial({ color: 0xff0000 }))
      mesh.position.copy(pos)
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

  public render() {
    if (this.exploded) {
    }
  }

  public getObject() {
    return this.object
  }
}