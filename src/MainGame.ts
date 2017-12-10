import * as THREE from 'three'
import { OrbitControls } from './vendors/OrbitControls'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { AbstractGame, GameConfig } from './AbstractGame'
import { AbstractWallGenerator } from './AbstractWallGenerator'
import { BoxWallGenerator } from './BoxWallGenerator'
import { RockGenerator } from './RockGenerator'
import { RollingBall } from './RollingBall'

export class MainGame extends AbstractGame {
  wallGenerator: AbstractWallGenerator
  walls: THREE.Mesh[]
  controls: any
  rock: THREE.Object3D
  ball: RollingBall

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

    this.rock = RockGenerator.generateRock()
    this.rock.position.x = 170
    this.rock.position.y = 7
    this.rock.position.z = 315
    this.rock.castShadow = true
    this.rock.receiveShadow = true
    this.rock.scale.set(3, 3, 3)

    const light = new THREE.PointLight(0xff00ff, 2, 280)
    light.position.set(170, 70, 230)
    light.castShadow = true
    light.shadow.bias = -0.001

    this.ball = new RollingBall(this.scene)

    this.scene.add(...this.walls, floor, this.rock, ambientLight, light)
  }

  render() {
    this.rock.rotateY(3 * Math.PI / 180)
    this.ball.move()
  }

  update() {
    this.controls.update()
  }
}