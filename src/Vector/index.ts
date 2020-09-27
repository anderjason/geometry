import { Matrix } from "../Matrix";

export class Vector {
  elements: number[];

  constructor(elements: number[]) {
    this.elements = Array.from(elements);
  }

  withMultipliedMatrix(matrix: Matrix): Vector {
    const thisAsMatrix = Matrix.givenRow(this.elements);
    return matrix.withMultipliedMatrix(thisAsMatrix).toColumnVector(0);
  }
}
