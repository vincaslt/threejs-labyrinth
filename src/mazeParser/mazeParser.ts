import { maze } from './mazeLines'

export function getMaze(offset: number): Line[] {
  const lines = maze.split('"')
  const lineArr: Line[] = []
  for (let i = 0; i < (lines.length - 1) / 8; i += 1) {
    const id = i * 8
    lineArr.push({
      x1: parseInt(lines[id + 1]) - offset,
      y1: parseInt(lines[id + 3]) - offset,
      x2: parseInt(lines[id + 5]) - offset,
      y2: parseInt(lines[id + 7]) - offset
    })
  }
  return lineArr
}