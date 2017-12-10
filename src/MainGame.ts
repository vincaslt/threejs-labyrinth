import * as THREE from 'three'
import { getMaze, getFloorDiagonal } from './mazeParser/mazeParser'
import { AbstractGame, GameConfig } from './AbstractGame'
import { AbstractWallGenerator } from './AbstractWallGenerator'
import { BoxWallGenerator } from './BoxWallGenerator'
import { RockGenerator } from './RockGenerator'
import { RollingBall } from './RollingBall'
import { FreeViewCamera } from './cameras/FreeViewCamera'
import { AbstractCamera } from './cameras/AbstractCamera'
import { DirectedCamera } from './cameras/DirectedCamera'
import { FollowCamera } from './cameras/FollowCamera'
import { GUI } from './GUI'

export class MainGame extends AbstractGame {
  wallGenerator: AbstractWallGenerator
  walls: THREE.Mesh[]
  rock: THREE.Object3D
  ball: RollingBall
  cameras: AbstractCamera[] = []
  activeCamera: number = 0
  private followCamera: FollowCamera

  constructor(config: GameConfig) {
    super(config)
    this.wallGenerator = new BoxWallGenerator(15)

    this.init()
    this._render()
  }

  private refreshActiveCamera() {
    this.camera = this.cameras[this.activeCamera]
  }

  init() {
    this.cameras.push(new FreeViewCamera())
    this.cameras.push(new DirectedCamera())
    this.followCamera = new FollowCamera()
    this.cameras.push(this.followCamera)

    GUI.add(this, 'activeCamera').min(0).step(1).max(this.cameras.length - 1)

    this.refreshActiveCamera()
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

    const light = new THREE.PointLight(0xff00ff, 2, 250)
    light.position.set(170, 70, 230)
    light.castShadow = true
    light.shadow.bias = -0.001

    this.ball = new RollingBall(this.scene)

    this.cameras.forEach(camera => camera.setTarget(this.ball.ball))
    this.followCamera.addDirectionVector(this.ball.direction)

    this.scene.add(...this.walls, floor, this.rock, ambientLight, light)
  }

  render() {
    this.rock.rotateY(3 * Math.PI / 180)
    this.ball.move()
  }

  update() {
    this.camera.update(this.scene)
    this.refreshActiveCamera()
  }
}