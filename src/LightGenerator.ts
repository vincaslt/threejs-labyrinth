import * as THREE from 'three'
import { lightPoints } from './lightPoints'

export class LightGenerator {
  static generateLights() {
    return lightPoints.map(point => {
      var light = new THREE.PointLight(point.color || 0x00ff00, 1, 15)
      light.position.set(point.x, 7, point.y)
      light.castShadow = true
      light.shadow.bias = -0.001

      var geometry = new THREE.SphereGeometry(1, 12, 6)
      var material = new THREE.MeshBasicMaterial({ color: 0x111111 })
      var sphere = new THREE.Mesh(geometry, material)
      light.add(sphere)

      return light
    })
  }
}