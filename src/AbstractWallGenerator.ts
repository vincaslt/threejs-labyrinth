export abstract class AbstractWallGenerator {
  public abstract generateWall(line: Line): THREE.Mesh
  public abstract generateCeiling(diagonal: Line): THREE.Mesh
  public abstract generateFloor(diagonal: Line): THREE.Mesh
}