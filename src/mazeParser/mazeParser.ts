import { maze } from './mazeLines'

export function getMaze(offset: number, scale: number = 1): Line[] {
  const lines = maze.split('"')
  const lineArr: Line[] = []
  for (let i = 0; i < (lines.length - 1) / 8; i += 1) {
    const id = i * 8
    lineArr.push({
      x1: scale * (parseInt(lines[id + 1]) - offset),
      y1: scale * (parseInt(lines[id + 3]) - offset),
      x2: scale * (parseInt(lines[id + 5]) - offset),
      y2: scale * (parseInt(lines[id + 7]) - offset)
    })
  }
  return lineArr
}

export function getFloorDiagonal(maze: Line[]) {
  const diagonal: Line = { x1: 0, x2: 0, y1: 0, y2: 0 }
  maze.forEach((line) => {
    diagonal.x1 = Math.min(line.x1, line.x2, diagonal.x1)
    diagonal.x2 = Math.max(line.x1, line.x2, diagonal.x2)
    diagonal.y1 = Math.min(line.y1, line.y2, diagonal.y1)
    diagonal.y2 = Math.max(line.y1, line.y2, diagonal.y2)
  })
  return diagonal
}