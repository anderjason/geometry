import { Box2 } from "../Box2";
import { Point2 } from "../Point2";
import { Segment2 } from "../Segment2";
import { Vector2 } from "../Vector2";
export declare class Ray2 {
    readonly origin: Point2;
    readonly direction: Vector2;
    constructor(origin: Point2, direction: Vector2);
    toSegmentGivenBoundingBox(box: Box2): Segment2;
    toDistanceGivenBox(box: Box2): number;
}
