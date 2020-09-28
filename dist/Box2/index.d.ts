import { Point2 } from "../Point2";
import { Size2, ScaleMode } from "../Size2";
export declare type Anchor2 = "leftTop" | "centerTop" | "rightTop" | "leftCenter" | "center" | "rightCenter" | "leftBottom" | "centerBottom" | "rightBottom";
export interface ScaledBox2 {
    box: Box2;
    scale: number;
}
export declare class Box2 {
    static givenDomRect(domRect: DOMRect): Box2;
    static givenCenterSize(center: Point2, size: Size2): Box2;
    static givenOppositeCorners(pointA: Point2, pointB: Point2): Box2;
    static givenTopLeftSize(topLeft: Point2, size: Size2): Box2;
    static givenContainedPoints(points: Point2[]): Box2;
    static isEqual(a: Box2, b: Box2): boolean;
    private _center;
    private _size;
    private constructor();
    get center(): Point2;
    get size(): Size2;
    isPointInside(point: Point2): boolean;
    isEqual(other: Box2): boolean;
    toTop(): number;
    toLeft(): number;
    toRight(): number;
    toBottom(): number;
    toLeftTop(): Point2;
    toCenterTop(): Point2;
    toRightTop(): Point2;
    toLeftCenter(): Point2;
    toRightCenter(): Point2;
    toLeftBottom(): Point2;
    toCenterBottom(): Point2;
    toRightBottom(): Point2;
    toScaledBox(boundingBox: Box2, scaleMode: ScaleMode, anchor: Anchor2): ScaledBox2;
    withAddedSize(size: Size2, anchor: Anchor2): Box2;
}
