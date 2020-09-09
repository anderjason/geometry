import { Point2 } from "../Point2";
import { Vector2 } from "../Vector2";
import { LineSegment2 } from "..";
import { optionalLineIntersectionGivenPoints } from "./optionalLineIntersectionGivenPoints";

export class Line2 {
  private _vector: Vector2;
  private _point: Point2;

  static givenVectorAndPoint(vector: Vector2, point: Point2): Line2 {
    return new Line2(vector, point);
  }

  static givenPoints(a: Point2, b: Point2): Line2 {
    const vector = a.toVector(b);
    return new Line2(vector, a);
  }

  static givenLineSegment(lineSegment: LineSegment2): Line2 {
    return Line2.givenPoints(lineSegment.startPoint, lineSegment.endPoint);
  }

  static isEqual(a: Line2, b: Line2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected constructor(vector: Vector2, point: Point2) {
    this._vector = vector.withNormalizedMagnitude();
    this._point = point;
  }

  get vector(): Vector2 {
    return this._vector;
  }

  get point(): Point2 {
    return this._point;
  }

  isEqual(other: Line2): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Line2)) {
      return false;
    }

    return other.vector.isEqual(this.vector) && other.point.isEqual(this.point);
  }

  toClone(): Line2 {
    return new Line2(this._vector.toClone(), this._point.toClone());
  }

  toNearestTouchingPoint(point: Point2): Point2 {
    const pnt = Vector2.givenXY(point.x, point.y);

    const linePnt = Vector2.givenXY(this._point.x, this._point.y);

    const v = pnt.withSubtractedVector(linePnt);
    const d = v.toDotProduct(this._vector);

    return linePnt
      .withAddedVector(this._vector.withMultipliedScalar(d))
      .toPoint();
  }

  toOptionalIntersectionGivenSegment(other: LineSegment2): Point2 {
    const startA = this.point;
    const endA = this.point.withAddedVector(this.vector);
    const startB = other.startPoint;
    const endB = other.endPoint;

    return optionalLineIntersectionGivenPoints(
      startA,
      endA,
      startB,
      endB,
      "extendThis"
    );
  }

  toOptionalIntersectionGivenLine(other: Line2): Point2 {
    const startA = this.point;
    const endA = this.point.withAddedVector(this.vector);
    const startB = other.point;
    const endB = other.point.withAddedVector(other.vector);

    return optionalLineIntersectionGivenPoints(
      startA,
      endA,
      startB,
      endB,
      "extendBoth"
    );
  }

  withIntercept(intercept: Point2): Line2 {
    return new Line2(this._vector, intercept);
  }

  withVector(vector: Vector2): Line2 {
    return new Line2(vector, this._point);
  }
}
