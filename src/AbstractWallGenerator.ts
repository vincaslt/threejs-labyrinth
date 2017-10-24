export abstract class AbstractWallGenerator {
  lines: Line[]
  wallHeight: number

  constructor(mazeLines: Line[], wallHeight: number) {
    this.lines = mazeLines
    this.wallHeight = wallHeight
  }
  public abstract generateWall(line: Line): THREE.Mesh[]
  public abstract generateCeiling(diagonal: Line): THREE.Mesh
  public abstract generateFloor(diagonal: Line): THREE.Mesh

  public generateWalls(): THREE.Mesh[] {
    const walls: THREE.Mesh[] = []
    this.lines.forEach(line => {
      this.generateWall(line).forEach(wall => {
        if (wall) {
          walls.push(wall)
        }
      })
    })
    return walls
  }
}