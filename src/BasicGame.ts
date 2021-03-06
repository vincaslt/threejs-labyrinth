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
  public renderer = new THREE.WebGLRenderer({ antialias: true })
  public canvas: HTMLCanvasElement

  constructor(config: GameConfig) {
    this.config = config
    // this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.renderSingleSided = false
    this.renderer.shadowMap.autoUpdate = true
    this.renderer.setSize(this.config.width, this.config.height)
    this.canvas = this.renderer.domElement

    const el = document.querySelector('#game')
    if (el.firstChild) {
      el.removeChild(el.firstChild)
    }
    el.appendChild(this.canvas)
  }

  protected _render() {
    this.render()
    this.renderer.shadowMap.render(this.scene, this.camera)
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.animate(new Date().getTime()))
  }

  abstract render(): void
  abstract init(): void
  abstract update(): void

  animate(lastFrameTime: number = 0) {
    const deltaTime = new Date().getTime() - lastFrameTime
    if (deltaTime >= 1000 / this.config.fps) {
      this.update()
      this._render()
      return
    }
    this.update()
    requestAnimationFrame(() => this.animate(lastFrameTime))
  }
}