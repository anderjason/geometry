import { ScaleMode } from "../Size2";

export class Size3 {
  static givenWidthHeightDepth(
    width: number,
    height: number,
    depth: number
  ): Size3 {
    return new Size3(width, height, depth);
  }

  static ofZero(): Size3 {
    return new Size3(0, 0, 0);
  }

  static isEqual(a: Size3, b: Size3): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected _width: number;
  protected _height: number;
  protected _depth: number;
  protected _half: Size3;

  protected constructor(width: number, height: number, depth: number) {
    this._width = width;
    this._height = height;
    this._depth = depth;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get depth(): number {
    return this._depth;
  }

  get isZero(): boolean {
    return this._width === 0 || this._height === 0 || this._depth === 0;
  }

  toHalf(): Size3 {
    if (this._half == null) {
      this._half = Size3.givenWidthHeightDepth(
        this._width / 2,
        this._height / 2,
        this._depth / 2
      );
    }

    return this._half;
  }

  isEqual(other: Size3): boolean {
    if (other == null) {
      return false;
    }

    return (
      other._width == this._width &&
      other._height == this._height &&
      other._depth == this._depth
    );
  }

  withAvailableSize(availableSize: Size3, scaleMode: ScaleMode): Size3 {
    if (availableSize == null) {
      throw new Error("availableSize is required");
    }

    if (availableSize.isZero || this.isZero) {
      return Size3.ofZero();
    }

    const scaleX = availableSize.width / this._width;
    const scaleY = availableSize.height / this._height;
    const scaleZ = availableSize.depth / this._depth;
    const scale = Math.min(scaleX, scaleY, scaleZ);

    if (scale < 1 && scaleMode === "expand") {
      // would shrink, but only expanding is allowed
      return this;
    }

    if (scale > 1 && scaleMode === "shrink") {
      // would expand, but only shrinking is allowed
      return this;
    }

    return Size3.givenWidthHeightDepth(
      this._width * scale,
      this._height * scale,
      this._depth * scale
    );
  }

  withAddedWidthHeightDepth(
    width: number,
    height: number,
    depth: number
  ): Size3 {
    return Size3.givenWidthHeightDepth(
      this._width + width,
      this._height + height,
      this._depth + depth
    );
  }

  withAddedSize(other: Size3): Size3 {
    return Size3.givenWidthHeightDepth(
      this._width + other.width,
      this._height + other.height,
      this._depth + other.depth
    );
  }
}
