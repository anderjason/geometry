import { Point2 } from "..";

export type LineIntersectionMode =
  | "touch"
  | "extendThis"
  | "extendOther"
  | "extendBoth";

export function optionalLineIntersectionGivenPoints(
  startA: Point2,
  endA: Point2,
  startB: Point2,
  endB: Point2,
  mode: LineIntersectionMode
): Point2 {
  // based on https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines

  // if the lines intersect, the result contains the x and y of the intersection
  // (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  let denominator: number;
  let a: number;
  let b: number;
  let numerator1: number;
  let numerator2: number;
  let x: number;
  let y: number;
  let onLine1;
  let onLine2;

  denominator =
    (endB.y - startB.y) * (endA.x - startA.x) -
    (endB.x - startB.x) * (endA.y - startA.y);

  if (denominator == 0) {
    return undefined;
  }

  a = startA.y - startB.y;
  b = startA.x - startB.x;

  numerator1 = (endB.x - startB.x) * a - (endB.y - startB.y) * b;
  numerator2 = (endA.x - startA.x) * a - (endA.y - startA.y) * b;

  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  x = startA.x + a * (endA.x - startA.x);
  y = startA.y + a * (endA.y - startA.y);

  // if line1 is a segment and line2 is infinite, they intersect if:
  if (a > 0 && a < 1) {
    onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (b > 0 && b < 1) {
    onLine2 = true;
  }

  if (mode === "touch" && (onLine1 === false || onLine2 === false)) {
    return undefined;
  }

  if (mode === "extendOther" && onLine1 === false) {
    return undefined;
  }

  if (mode === "extendThis" && onLine2 === false) {
    return undefined;
  }

  return Point2.givenXY(x, y);
}
