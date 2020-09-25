import { Point2 } from "../Point2";
import { Vector2 } from "../Vector2";
import { NumberUtil, Percent } from "@anderjason/util";
import { Line2 } from "../Line2";
import { optionalLineIntersectionGivenPoints } from "../Line2/optionalLineIntersectionGivenPoints";

const half = Percent.givenFraction(1, 2);

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

  toMidpoint(): Point2 {
    return this.toIntermediatePoint(half);
  }

  toIntermediatePoint(percent: Percent): Point2 {
    const t = percent.toNumber(1);

    const x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * t;
    const y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * t;

    return Point2.givenXY(x, y);
  }

  toOptionalIntersectionGivenLine(other: Line2): Point2 {
    return other.toOptionalIntersectionGivenSegment(this);
  }

  toOptionalIntersectionGivenSegment(other: LineSegment2): Point2 {
    const startA = this.startPoint;
    const endA = this.endPoint;
    const startB = other.startPoint;
    const endB = other.endPoint;

    return optionalLineIntersectionGivenPoints(
      startA,
      endA,
      startB,
      endB,
      "touch"
    );
  }

  toPointGivenDistance(distance: number, fromPoint: "start" | "end"): Point2 {
    switch (fromPoint) {
      case "start":
        if (distance === 0) {
          return this.startPoint;
        }

        return this.startPoint.withAddedVector(
          Vector2.givenPoints(this.startPoint, this.endPoint)
            .withNormalizedMagnitude()
            .withMultipliedScalar(distance)
        );
      case "end":
        if (distance === 0) {
          return this.endPoint;
        }

        return this.endPoint.withAddedVector(
          Vector2.givenPoints(this.endPoint, this.startPoint)
            .withNormalizedMagnitude()
            .withMultipliedScalar(distance)
        );
      default:
        throw new Error("Unsupported fromPoint");
    }
  }

  withAddedVector(vector: Vector2): LineSegment2 {
    return new LineSegment2(
      this._start.withAddedVector(vector),
      this._end.withAddedVector(vector)
    );
  }

  withSubtractedVector(vector: Vector2): LineSegment2 {
    return new LineSegment2(
      this._start.withSubtractedVector(vector),
      this._end.withSubtractedVector(vector)
    );
  }
}
