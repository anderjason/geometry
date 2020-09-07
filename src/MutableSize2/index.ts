import { Size2 } from "../Size2";

export class MutableSize2 extends Size2 {
  static givenWidthHeight(width: number, height: number): MutableSize2 {
    return new MutableSize2(width, height);
  }

  static givenSize2(size: Size2): MutableSize2 {
    return new MutableSize2(size.width, size.height);
  }

  static ofZero(): MutableSize2 {
    return new MutableSize2(0, 0);
  }

  private constructor(width: number, height: number) {
    super(width, height);
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  set width(value: number) {
    this._width = value;
    this._half = undefined;
  }

  set height(value: number) {
    this._height = value;
    this._half = undefined;
  }

  toClone(): MutableSize2 {
    return new MutableSize2(this.width, this.height);
  }
}
