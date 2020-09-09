import { Point2 } from "..";
export declare type LineIntersectionMode = "touch" | "extendThis" | "extendOther" | "extendBoth";
export declare function optionalLineIntersectionGivenPoints(startA: Point2, endA: Point2, startB: Point2, endB: Point2, mode: LineIntersectionMode): Point2;
