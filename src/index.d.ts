declare module 'dat.gui' {
  import * as dat from 'dat-gui'
  export default dat
  
}

declare module '*.svg' {
  var value: any
  export = value
}

declare module '*.jpg' {
  var value: string
  export = value
}

declare interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

declare module 'three-trackballcontrols' {
  import * as THREE from 'three'
  namespace TrackballControls {}
  class TrackballControls extends THREE.TrackballControls {}
  export = TrackballControls
}

declare interface Point {
  x: number,
  y: number,
  z: number
}