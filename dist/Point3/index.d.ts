import { Percent } from "@anderjason/util";
export declare class Point3 {
    protected _x: number;
    protected _y: number;
    protected _z: number;
    static givenXYZ(x: number, y: number, z: number): Point3;
    private static _zero;
    static ofZero(): Point3;
    static isEqual(a: Point3, b: Point3): boolean;
    protected constructor(x: number, y: number, z: number);
    get x(): number;
    get y(): number;
    get z(): number;
    get isZero(): boolean;
    isEqual(other: Point3): boolean;
    withWeightedAverage(other: Point3, weight: Percent): Point3;
    withAddedPoint(other: Point3): Point3;
    withSubtractedPoint(other: Point3): Point3;
}
