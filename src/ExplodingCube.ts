import * as THREE from 'three'

export class ExplodingCube {
  object: THREE.Mesh

  constructor(color: number = 0xffee00) {
    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide, wireframe: true })
    const geom = new THREE.DodecahedronGeometry(1, 2)
    geom.computeBoundingBox()
    // geom.vertices = geom.vertices.map(v => new THREE.Vector3(
    //   v.x + Math.random(),
    //   v.y + Math.random(),
    //   v.z + Math.random()
    // ))
    this.object = new THREE.Mesh(geom, material)
  }

  public getObject() {
    return this.object
  }
}