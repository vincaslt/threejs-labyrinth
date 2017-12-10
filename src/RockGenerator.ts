import * as THREE from 'three'
import { ConvexGeometry } from './vendors/ConvexGeometry'
import * as image from './checkerboard.o.jpg'

const H = 1
const R = 1

function rng(min, max) {
  return Math.random() * (max - min) + min
}

export class RockGenerator {
  private static generatePoint(h: number, baseR: number): THREE.Vector3 {
    const y = rng(-h / 2, h / 2)
    const radius = ((baseR ** 2) / (2 * h ** 2)) * (y - h) ** 2
    const rad = rng(0, 2 * Math.PI)
    const x = radius * Math.sin(rad)
    const z = radius * Math.cos(rad)
    return new THREE.Vector3(x, y, z)
  }

  private static generatePoints(n: number, h: number, baseR: number): THREE.Vector3[] {
    return Array(n).fill(1).map(() => RockGenerator.generatePoint(h, baseR))
  }

  private static generateFaceVertexUvs(geom: THREE.Geometry) {
    const getUV = (vx: THREE.Vector3) => {
      const n = vx.normalize() // ?
      let u = Math.atan2(n.z, n.x) / Math.PI * 0.5 + 0.5
      let v = 0.5 - Math.asin(n.y) / Math.PI
      return new THREE.Vector2(
        u,
        v
      )
    }
    const fixUVs = (a: THREE.Vector2, b: THREE.Vector2) => {
      if (a.distanceTo(b) >= 1) {
        if (a.x >= b.x) {
          a.x -= 1
        } else {
          b.x -= 1
        }
      }
    }
    return geom.faces.map(face => {
      const uvs = [
        getUV(geom.vertices[face.a]),
        getUV(geom.vertices[face.b]),
        getUV(geom.vertices[face.c])
      ]
      fixUVs(uvs[0], uvs[1])
      fixUVs(uvs[0], uvs[2])
      fixUVs(uvs[1], uvs[2])
      return uvs
    })
  }

  static generateRock() {
    const points = RockGenerator.generatePoints(500, H, R)

    const geometry = new ConvexGeometry(points)
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()
    geometry.faceVertexUvs[0] = RockGenerator.generateFaceVertexUvs(geometry)
    geometry.uvsNeedUpdate = true
    const texture = THREE.ImageUtils.loadTexture(image)
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    material.map = texture
    const mesh = new THREE.Mesh(geometry, material)

    const dotGeometry = new THREE.Geometry()
    dotGeometry.vertices = geometry.vertices
    const dotMaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xff0000 })
    const dot = new THREE.Points(dotGeometry, dotMaterial)
    mesh.add(dot)


    return mesh
  }
}