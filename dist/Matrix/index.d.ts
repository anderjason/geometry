import { Vector } from "../Vector";
export declare type MatrixRow = number[];
export declare type MatrixRows = MatrixRow[];
export declare class Matrix {
    rows: MatrixRows;
    static ofIdentity(size: number): Matrix;
    static givenRows(rows: MatrixRows): Matrix;
    static givenRow(row: MatrixRow): Matrix;
    private constructor();
    isSquare(): boolean;
    isSingular(): boolean;
    toDeterminant(): number;
    withClone(): Matrix;
    withRightTriangular(): Matrix;
    toOptionalValueGivenRowAndColumn(rowIndex: number, colIndex: number): number;
    withMap(fn: (value: number, rowIdx: number, colIdx: number) => number): Matrix;
    withMultipliedMatrix(matrix: Matrix): Matrix;
    toColumnVector(columnIndex: number): Vector;
    withAugumentedMatrix(other: Matrix): Matrix;
    withInverse(): Matrix;
}
