import * as THREE from 'three'

export interface GameConfig {
  fps: number
  width: number
  height: number
}

export abstract class BasicGame {
  public config: GameConfig
  public camera: THREE.Camera
  public scene = new THREE.Scene()
  public renderer = new THREE.WebGLRenderer()

  constructor(config: GameConfig) {
    this.config = config
    this.renderer.setSize(this.config.width, this.config.height)
    document.body.appendChild(this.renderer.domElement)
    this.animate(new Date().getTime())
  }

  abstract render(): void

  animate(lastFrameTime: number = 0) {
    const now = new Date().getTime()
    const deltaTime = now - lastFrameTime
    if (deltaTime >= 1000 / this.config.fps) {
      this.render()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(() => this.animate(now))
      return
    }
    requestAnimationFrame(() => this.animate(lastFrameTime))
  }
}