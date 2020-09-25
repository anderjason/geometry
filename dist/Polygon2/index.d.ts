import { Point2, Box2 } from "..";
export declare class Polygon2 {
    readonly points: Point2[];
    static ofEmpty(): Polygon2;
    static givenPoints(points: Point2[]): Polygon2;
    private constructor();
    get isClockwise(): boolean;
    withExpansion: (distance: number) => Polygon2;
    toSvgPathString: (cornerRadius?: number) => string;
    toBounds: () => Box2;
}
