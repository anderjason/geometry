import { Point2, Box2 } from "..";
export declare class Polygon2 {
    readonly points: Point2[];
    static ofEmpty(): Polygon2;
    static givenPoints(points: Point2[]): Polygon2;
    static isEqual(a: Polygon2, b: Polygon2): boolean;
    private constructor();
    get isClockwise(): boolean;
    isEqual(other: Polygon2): boolean;
    withExpansion: (distance: number) => Polygon2;
    toSvgPathString: (cornerRadius?: number) => string;
    toBounds: () => Box2;
}
