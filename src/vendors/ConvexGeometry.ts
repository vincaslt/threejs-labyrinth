import * as THREE from 'three'
import { QuickHull } from './QuickHull'

// ConvexGeometry

export class ConvexGeometry extends THREE.Geometry {
  type = 'ConvexGeometry'

  constructor(points: THREE.Vector3[]) {
    super()
    this.fromBufferGeometry(new ConvexBufferGeometry(points))
    this.mergeVertices()
  }
}

export class ConvexBufferGeometry extends THREE.BufferGeometry {
  type = 'ConvexBufferGeometry'

  constructor(points: THREE.Vector3[]) {
    super()

    // buffers
    var vertices = []
    var normals = []

    // execute QuickHull

    if (QuickHull === undefined) {
      console.error('THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on THREE.QuickHull')
    }

    var quickHull = new QuickHull().setFromPoints(points)

    // generate vertices and normals

    var faces = quickHull.faces

    for (var i = 0; i < faces.length; i++) {

      var face = faces[i]
      var edge = face.edge

      // we move along a doubly-connected edge list to access all face points (see HalfEdge docs)

      do {

        var point = edge.head().point

        vertices.push(point.x, point.y, point.z)
        normals.push(face.normal.x, face.normal.y, face.normal.z)

        edge = edge.next

      } while (edge !== face.edge)

    }

    // build geometry

    this.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    this.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  }
}

