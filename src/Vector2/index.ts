import { Percent } from "@anderjason/util";
import { Point2 } from "../Point2";

export class Vector2 {
  static givenXY(x: number, y: number): Vector2 {
    return new Vector2(x, y);
  }

  static givenPoint(point: Point2): Vector2 {
    return new Vector2(point.x, point.y);
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

  protected _x: number;
  protected _y: number;

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
    return new Vector2(input * this._x, input * this._y);
  }

  withAddedVector(other: Vector2): Vector2 {
    return new Vector2(this._x + other._x, this._y + other._y);
  }

  withSubtractedVector(other: Vector2): Vector2 {
    return new Vector2(this._x - other._x, this._y - other._y);
  }

  toDotProduct(other: Vector2): number {
    return this._x * other._x + this._y * other._y;
  }

  toExteriorProduct(other: Vector2): number {
    return this.x * other.y - this.y * other.x;
  }

  withWeightedAverage(other: Vector2, weight: Percent): Vector2 {
    const t = weight.toNumber(1);

    const x1 = this.withMultipliedScalar(1 - t);
    const y1 = other.withMultipliedScalar(t);

    return x1.withAddedVector(y1);
  }
}
