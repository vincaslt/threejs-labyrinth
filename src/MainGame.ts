import * as THREE from 'three'
import { OrbitControls } from './vendors/OrbitControls'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { AbstractGame, GameConfig } from './AbstractGame'
import { LightGenerator } from './LightGenerator'
import { AbstractWallGenerator } from './AbstractWallGenerator'
import { BoxWallGenerator } from './BoxWallGenerator'
import { RockGenerator } from './RockGenerator'

export class MainGame extends AbstractGame {
  wallGenerator: AbstractWallGenerator
  walls: THREE.Mesh[]
  controls: any

  constructor(config: GameConfig) {
    super(config)
    this.wallGenerator = new BoxWallGenerator(15)

    this.init()
    this._render()
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.camera.position.x = 170
    this.camera.position.y = 30
    this.camera.position.z = 340
    this.camera.rotateX(-60 * Math.PI / 180)

    this.controls = new OrbitControls(this.camera, undefined)
    this.controls.rotateSpeed = 0.02
    this.controls.zoomSpeed = 0.2
    this.controls.keyPanSpeed = 0.02
    this.controls.enableDamping = true
    this.buildScene()
  }

  buildScene() {
    const mazeLines = getMaze(2, 1)
    const ambientLight = new THREE.AmbientLight(0x0c0c0c, 10)

    const floor = this.wallGenerator.generateFloor(getFloorDiagonal(mazeLines))
    this.walls = this.wallGenerator.generateWalls(mazeLines)
    const lights = LightGenerator.generateLights()

    const rock = RockGenerator.generateRock()
    rock.position.x = 170
    rock.position.y = 7
    rock.position.z = 305
    rock.castShadow = true
    rock.receiveShadow = true

    this.scene.add(...this.walls, floor, rock, ambientLight, ...lights)
  }

  render() {
  }

  update() {
    this.controls.update()
  }
}