import { Matrix } from "../Matrix";
export declare class Vector {
    elements: number[];
    constructor(elements: number[]);
    withMultipliedMatrix(matrix: Matrix): Vector;
}
