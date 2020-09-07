import { Point3 } from "../Point3";

export class MutablePoint3 extends Point3 {
  static givenXYZ(x: number, y: number, z: number): MutablePoint3 {
    return new MutablePoint3(x, y, z);
  }

  static givenPoint3(point: Point3): MutablePoint3 {
    return new MutablePoint3(point.x, point.y, point.z);
  }

  static ofZero(): MutablePoint3 {
    return new MutablePoint3(0, 0, 0);
  }

  private constructor(x: number, y: number, z: number) {
    super(x, y, z);
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

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }

  set z(value: number) {
    this._z = value;
  }

  toClone(): MutablePoint3 {
    return new MutablePoint3(this._x, this._y, this._z);
  }

  isEqual(other: MutablePoint3): boolean {
    if (other == null) {
      return false;
    }

    return other._x == this._x && other._y == this._y && other._z == this._z;
  }
}
