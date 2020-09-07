import { Percent } from "@anderjason/util";
import { Point2 } from "../Point2";
export declare class Vector2 {
    static givenXY(x: number, y: number): Vector2;
    static givenPoint(point: Point2): Vector2;
    static isEqual(a: Vector2, b: Vector2): boolean;
    protected _x: number;
    protected _y: number;
    private constructor();
    get x(): number;
    get y(): number;
    get isZero(): boolean;
    isEqual: (other: Vector2) => boolean;
    withMultipliedScalar(input: number): Vector2;
    withAddedVector(other: Vector2): Vector2;
    withSubtractedVector(other: Vector2): Vector2;
    toDotProduct(other: Vector2): number;
    toExteriorProduct(other: Vector2): number;
    withWeightedAverage(other: Vector2, weight: Percent): Vector2;
}
