import { Percent } from "@anderjason/util";

export class Point3 {
  protected _x: number;
  protected _y: number;
  protected _z: number;

  static givenXYZ(x: number, y: number, z: number): Point3 {
    return new Point3(x, y, z);
  }

  private static _zero: Point3 = new Point3(0, 0, 0);

  static ofZero(): Point3 {
    return this._zero;
  }

  static isEqual(a: Point3, b: Point3): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get z(): number {
    return this._z;
  }

  get isZero(): boolean {
    return this._x === 0 && this._y === 0 && this._z === 0;
  }

  toClone(): Point3 {
    return new Point3(this._x, this._y, this._z);
  }

  isEqual(other: Point3): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Point3)) {
      return false;
    }

    return other._x == this._x && other._y == this._y && other._z == this._z;
  }

  withWeightedAverage(other: Point3, weight: Percent): Point3 {
    const t = weight.toNumber(1);

    const x = this.x + (other.x - this.x) * t;
    const y = this.y + (other.y - this.y) * t;
    const z = this.z + (other.z - this.z) * t;

    return new Point3(x, y, z);
  }

  withAddedPoint(other: Point3): Point3 {
    return new Point3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  withSubtractedPoint(other: Point3): Point3 {
    return new Point3(this.x - other.x, this.y - other.y, this.z - other.z);
  }
}
