import { Point2 } from "../Point2";
import { Vector2 } from "../Vector2";
import { NumberUtil } from "@anderjason/util";

export type LineIntersectionMode =
  | "touch"
  | "extendThis"
  | "extendOther"
  | "extendBoth";

export class LineSegment2 {
  private _start: Point2;
  private _end: Point2;

  static givenXYPair(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): LineSegment2 {
    return new LineSegment2(Point2.givenXY(x1, y1), Point2.givenXY(x2, y2));
  }

  static givenPoints(startPoint: Point2, endPoint: Point2): LineSegment2 {
    return new LineSegment2(startPoint, endPoint);
  }

  static isEqual(a: LineSegment2, b: LineSegment2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected constructor(a: Point2, b: Point2) {
    this._start = a;
    this._end = b;
  }

  get startPoint(): Point2 {
    return this._start;
  }

  get endPoint(): Point2 {
    return this._end;
  }

  get startX(): number {
    return this._start.x;
  }

  get endX(): number {
    return this._end.x;
  }

  get startY(): number {
    return this._start.y;
  }

  get endY(): number {
    return this._end.y;
  }

  isEqual(other: LineSegment2): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof LineSegment2)) {
      return false;
    }

    return other._start.isEqual(this._start) && other._end.isEqual(this._end);
  }

  toClone(): LineSegment2 {
    return new LineSegment2(this._start.toClone(), this._end.toClone());
  }

  toLength(): number {
    return this._start.toDistance(this._end);
  }

  toNearestPoint(point: Point2, infinite: boolean): Point2 {
    const pnt = Vector2.givenXY(point.x, point.y);

    if (infinite) {
      const linePnt = Vector2.givenXY(this._start.x, this._start.y);
      const lineDir = Vector2.givenPoints(
        this._start,
        this._end
      ).withNormalizedMagnitude();

      const v = pnt.withSubtractedVector(linePnt);
      const d = v.toDotProduct(lineDir);

      return linePnt.withAddedVector(lineDir.withMultipliedScalar(d)).toPoint();
    } else {
      let line = Vector2.givenPoints(this._start, this._end);
      const len = line.toMagnitude();
      line = line.withNormalizedMagnitude();

      const startVector = Vector2.givenPoint(this._start);

      const v = pnt.withSubtractedVector(startVector);
      let d = v.toDotProduct(line);
      d = NumberUtil.numberWithHardLimit(d, 0, len);

      return startVector
        .withAddedVector(line.withMultipliedScalar(d))
        .toPoint();
    }
  }

  toOptionalIntersection(
    other: LineSegment2,
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
      (other._end.y - other._start.y) * (this._end.x - this._start.x) -
      (other._end.x - other._start.x) * (this._end.y - this._start.y);

    if (denominator == 0) {
      return undefined;
    }

    a = this._start.y - other._start.y;
    b = this._start.x - other._start.x;

    numerator1 =
      (other._end.x - other._start.x) * a - (other._end.y - other._start.y) * b;
    numerator2 =
      (this._end.x - this._start.x) * a - (this._end.y - this._start.y) * b;

    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    x = this._start.x + a * (this._end.x - this._start.x);
    y = this._start.y + a * (this._end.y - this._start.y);

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

  withAddedVector(vector: Vector2): LineSegment2 {
    return new LineSegment2(
      this._start.withAddedVector(vector),
      this._end.withAddedVector(vector)
    );
  }
}
