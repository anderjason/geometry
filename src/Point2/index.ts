import { Percent } from "@anderjason/util";
import { Vector2 } from "../Vector2";

export class Point2 {
  protected _x: number;
  protected _y: number;

  static givenXY(x: number, y: number): Point2 {
    return new Point2(x, y);
  }

  private static _zero = new Point2(0, 0);

  static ofZero(): Point2 {
    return this._zero;
  }

  static isEqual(a: Point2, b: Point2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get isZero(): boolean {
    return this._x === 0 && this._y === 0;
  }

  isEqual(other: Point2): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Point2)) {
      return false;
    }

    return other._x == this._x && other._y == this._y;
  }

  toClone(): Point2 {
    return new Point2(this._x, this._y);
  }

  // toAngle(other: Point2): number {
  //   const diff = this.withSubtractedPoint(other);

  //   return Math.atan2(diff.y, diff.x);
  // }

  toDistance(other: Point2): number {
    const diff = this.withSubtractedVector(Vector2.givenPoint(other));

    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
  }

  toVector(other: Point2): Vector2 {
    return Vector2.givenXY(other.x - this.x, other.y - this.y);
  }

  withWeightedAverage(other: Point2, weight: Percent): Point2 {
    const t = weight.toNumber(1);

    const x = this.x + (other.x - this.x) * t;
    const y = this.y + (other.y - this.y) * t;

    return new Point2(x, y);
  }

  withAngleDistance(angle: number, distance: number): Point2 {
    // Rotate the angle based on the browser coordinate system ([0,0] in the top left)
    const angleRotated = angle + Math.PI / 2;

    const x = this.x + Math.sin(angleRotated) * distance;
    const y = this.y - Math.cos(angleRotated) * distance;

    return new Point2(x, y);
  }

  withAddedVector(vector: Vector2): Point2 {
    return new Point2(this.x + vector.x, this.y + vector.y);
  }

  withSubtractedVector(vector: Vector2): Point2 {
    return new Point2(this.x - vector.x, this.y - vector.y);
  }
}
