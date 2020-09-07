import { Point2 } from "../Point2";

export class MutablePoint2 extends Point2 {
  static givenXY(x: number, y: number): MutablePoint2 {
    return new MutablePoint2(x, y);
  }

  static givenPoint2(point: Point2): MutablePoint2 {
    return new MutablePoint2(point.x, point.y);
  }

  static ofZero(): MutablePoint2 {
    return new MutablePoint2(0, 0);
  }

  private constructor(x: number, y: number) {
    super(x, y);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }

  toClone(): MutablePoint2 {
    return new MutablePoint2(this._x, this._y);
  }
}
