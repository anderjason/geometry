import { Point2 } from "../Point2";
import { Vector2 } from "../Vector2";
import { Percent } from "@anderjason/util";
import { Line2 } from "../Line2";
export declare class LineSegment2 {
    private _start;
    private _end;
    static givenXYPair(x1: number, y1: number, x2: number, y2: number): LineSegment2;
    static givenPoints(startPoint: Point2, endPoint: Point2): LineSegment2;
    static isEqual(a: LineSegment2, b: LineSegment2): boolean;
    protected constructor(a: Point2, b: Point2);
    get startPoint(): Point2;
    get endPoint(): Point2;
    get startX(): number;
    get endX(): number;
    get startY(): number;
    get endY(): number;
    isEqual(other: LineSegment2): boolean;
    toLength(): number;
    toNearestPoint(point: Point2, infinite: boolean): Point2;
    toMidpoint(): Point2;
    toIntermediatePoint(percent: Percent): Point2;
    toOptionalIntersectionGivenLine(other: Line2): Point2;
    toOptionalIntersectionGivenSegment(other: LineSegment2): Point2;
    toPointGivenDistance(lineSegment: LineSegment2, distance: number, fromPoint: "start" | "end"): Point2;
    withAddedVector(vector: Vector2): LineSegment2;
    withSubtractedVector(vector: Vector2): LineSegment2;
}
