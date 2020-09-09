import { Point2 } from "../Point2";
import { Vector2 } from "../Vector2";
import { LineSegment2 } from "..";
export declare class Line2 {
    private _vector;
    private _point;
    static givenVectorAndPoint(vector: Vector2, point: Point2): Line2;
    static givenPoints(a: Point2, b: Point2): Line2;
    static givenLineSegment(lineSegment: LineSegment2): Line2;
    static isEqual(a: Line2, b: Line2): boolean;
    protected constructor(vector: Vector2, point: Point2);
    get vector(): Vector2;
    get point(): Point2;
    isEqual(other: Line2): boolean;
    toClone(): Line2;
    toNearestTouchingPoint(point: Point2): Point2;
    toOptionalIntersectionGivenSegment(other: LineSegment2): Point2;
    toOptionalIntersectionGivenLine(other: Line2): Point2;
    withIntercept(intercept: Point2): Line2;
    withVector(vector: Vector2): Line2;
}