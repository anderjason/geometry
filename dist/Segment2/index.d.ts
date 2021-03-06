import { Point2 } from "../Point2";
import { Vector2 } from "../Vector2";
import { Percent } from "@anderjason/util";
import { Line2 } from "../Line2";
import { Box2 } from "../Box2";
export declare class Segment2 {
    private _start;
    private _end;
    static givenXYPair(x1: number, y1: number, x2: number, y2: number): Segment2;
    static givenPoints(startPoint: Point2, endPoint: Point2): Segment2;
    static isEqual(a: Segment2, b: Segment2): boolean;
    protected constructor(a: Point2, b: Point2);
    get startPoint(): Point2;
    get endPoint(): Point2;
    get startX(): number;
    get endX(): number;
    get startY(): number;
    get endY(): number;
    isEqual(other: Segment2): boolean;
    toLength(): number;
    toNearestPoint(point: Point2, infinite: boolean): Point2;
    toMidpoint(): Point2;
    toIntermediatePoint(percent: Percent): Point2;
    toOptionalIntersectionGivenLine(other: Line2): Point2;
    toOptionalIntersectionGivenSegment(other: Segment2): Point2;
    toPointGivenDistance(distance: number, fromPoint: "start" | "end"): Point2;
    withAddedVector(vector: Vector2): Segment2;
    withSubtractedVector(vector: Vector2): Segment2;
    withClippingBox(box: Box2): Segment2;
}
