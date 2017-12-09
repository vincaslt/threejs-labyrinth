import * as THREE from 'three'
import { ConvexGeometry } from './vendors/ConvexGeometry'

const H = 5
const R = 2

function rng(min, max) {
  return Math.random() * (max - min) + min
}

export class RockGenerator {
  private static generatePoint(h: number, baseR: number): THREE.Vector3 {
    const y = rng(-h / 2, h / 2)
    const radius = ((baseR ** 2) / (2 * h ** 2)) * (y - h) ** 2
    const length = rng(0, radius)
    const rad = rng(0, 2 * Math.PI)
    const x = length * Math.sin(rad)
    const z = length * Math.cos(rad)
    return new THREE.Vector3(x, y, z)
  }

  private static generatePoints(n: number, h: number, baseR: number): THREE.Vector3[] {
    return Array(n).fill(1).map(() => RockGenerator.generatePoint(h, baseR))
  }

  static generateRock() {
    const points = RockGenerator.generatePoints(500, H, R)

    var geometry = new ConvexGeometry(points)
    var material = new THREE.MeshPhongMaterial({ color: 0x444444, side: THREE.DoubleSide })
    var mesh = new THREE.Mesh(geometry, material)
    return mesh
  }
}