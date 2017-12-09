export interface Light {
  x: number
  y: number
  color?: number
}

export const lightPoints: Light[] = [
  { x: 170, y: 295, color: 0x0000ff },
  { x: 170, y: 320, color: 0x00ff00 },
  { x: 133, y: 280, color: 0xff0000 },
  { x: 85, y: 215, color: 0x0000ff },
  { x: 155, y: 215, color: 0xffff00 },
  { x: 120, y: 200, color: 0xff00ff },
  { x: 118, y: 170, color: 0xffffff },
  { x: 100, y: 135, color: 0x550055 },
  { x: 135, y: 5, color: 0xff5500 },
  { x: 190, y: 3, color: 0x0055ff },
  { x: 120, y: 25, color: 0x00ffff }
]