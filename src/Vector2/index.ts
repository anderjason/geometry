import { Percent } from "@anderjason/util";
import { Point2 } from "../Point2";
import { Rotation } from "../Rotation";

export type RotationDirection = "clockwise" | "counterclockwise";

export class Vector2 {
  static givenXY(x: number, y: number): Vector2 {
    return new Vector2(x, y);
  }

  static givenPoint(point: Point2): Vector2 {
    return new Vector2(point.x, point.y);
  }

  static givenPoints(startPoint: Point2, endPoint: Point2): Vector2 {
    return startPoint.toVector(endPoint);
  }

  static isEqual(a: Vector2, b: Vector2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  private _x: number;
  private _y: number;

  private constructor(x: number, y: number) {
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

  isEqual = (other: Vector2): boolean => {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Vector2)) {
      return false;
    }

    return this._x === other._x && this._y === other._y;
  };

  withMultipliedScalar(input: number): Vector2 {
    return new Vector2(this._x * input, this._y * input);
  }

  withDividedScalar(input: number): Vector2 {
    return new Vector2(this._x / input, this._y / input);
  }

  withAddedVector(other: Vector2): Vector2 {
    return new Vector2(this._x + other._x, this._y + other._y);
  }

  withSubtractedVector(other: Vector2): Vector2 {
    return new Vector2(this._x - other._x, this._y - other._y);
  }

  withMultipliedVector(other: Vector2): Vector2 {
    return new Vector2(this._x * other._x, this._y * other._y);
  }

  withDividedVector(other: Vector2): Vector2 {
    return new Vector2(this._x / other._x, this._y / other._y);
  }

  toPoint(): Point2 {
    return Point2.givenXY(this.x, this.y);
  }

  toDotProduct(other: Vector2): number {
    return this._x * other._x + this._y * other._y;
  }

  toMagnitude(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  toAngle(other: Vector2): Rotation {
    // this always returns a rotation between 0 and PI because
    // two vectors cannot point more away from each other than directly
    // away from each other, which can always be achieved by a rotation
    // of PI radians (180 degrees)

    const dot = this.toDotProduct(other);
    const magnitude = this.toMagnitude() * other.toMagnitude();

    return Rotation.givenRadians(Math.acos(dot / magnitude));
  }

  withNormalizedMagnitude(): Vector2 {
    return this.withDividedScalar(this.toMagnitude());
  }

  withReversedDirection(): Vector2 {
    return new Vector2(-this._x, -this._y);
  }

  withRotation(rotation: Rotation, direction: RotationDirection): Vector2 {
    let rad = rotation.radians;

    if (direction === "clockwise") {
      rad *= -1;
    }

    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const ox = this.x;
    const oy = this.y;

    return new Vector2(ox * cos - oy * sin, ox * sin + oy * cos);
  }

  withPerpendicularDirection(rotation: RotationDirection): Vector2 {
    if (rotation === "clockwise") {
      return new Vector2(this.y, -this.x);
    } else {
      return new Vector2(-this.y, this.x);
    }
  }

  withWeightedAverage(other: Vector2, weight: Percent): Vector2 {
    const t = weight.toNumber(1);

    const x1 = this.withMultipliedScalar(1 - t);
    const y1 = other.withMultipliedScalar(t);

    return x1.withAddedVector(y1);
  }
}
