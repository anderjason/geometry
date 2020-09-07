import { Percent } from "@anderjason/util";
import { Vector2 } from "../Vector2";
export declare class Point2 {
    protected _x: number;
    protected _y: number;
    static givenXY(x: number, y: number): Point2;
    private static _zero;
    static ofZero(): Point2;
    static isEqual(a: Point2, b: Point2): boolean;
    protected constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    get isZero(): boolean;
    isEqual(other: Point2): boolean;
    toClone(): Point2;
    toDistance(other: Point2): number;
    withWeightedAverage(other: Point2, weight: Percent): Point2;
    withAngleDistance(angle: number, distance: number): Point2;
    withAddedVector(vector: Vector2): Point2;
    withSubtractedVector(vector: Vector2): Point2;
}
