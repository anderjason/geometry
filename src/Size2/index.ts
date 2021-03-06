export type ScaleMode = "flexible" | "expand" | "shrink";
export type ScaleFit = "cover" | "contain";

export interface ScaledSize2 {
  size: Size2;
  scale: number;
}

export class Size2 {
  protected _width: number;
  protected _height: number;

  static givenWidthHeight(width: number, height: number): Size2 {
    return new Size2(width, height);
  }

  static ofZero(): Size2 {
    return new Size2(0, 0);
  }

  static isEqual(a: Size2, b: Size2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected _half: Size2;

  protected constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get isZero(): boolean {
    return this._width === 0 || this._height === 0;
  }

  toHalf(): Size2 {
    if (this._half == null) {
      this._half = Size2.givenWidthHeight(this._width / 2, this._height / 2);
    }

    return this._half;
  }

  isEqual(other: Size2): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Size2)) {
      return false;
    }

    return other._width == this._width && other._height == this._height;
  }

  toScale(availableSize: Size2, scaleMode: ScaleMode, scaleFit: ScaleFit = "contain"): number {
    if (availableSize == null) {
      throw new Error("availableSize is required");
    }

    if (availableSize.isZero || this.isZero) {
      return 0;
    }

    const scaleX = availableSize.width / this._width;
    const scaleY = availableSize.height / this._height;
    
    let scale: number;
    switch (scaleFit) {
      case "contain":
        scale = Math.min(scaleX, scaleY);
        break;
      case "cover":
        scale = Math.max(scaleX, scaleY);
        break;
      default:
        throw new Error(`Unsupported scaleFit (expected "cover" or "contain" but got '${scaleFit}')`);
    }

    if (scale < 1 && scaleMode === "expand") {
      // would shrink, but only expanding is allowed
      return 1;
    }

    if (scale > 1 && scaleMode === "shrink") {
      // would expand, but only shrinking is allowed
      return 1;
    }

    return scale;
  }

  toScaledSize(availableSize: Size2, scaleMode: ScaleMode, scaleFit: ScaleFit = "contain"): ScaledSize2 {
    const scale = this.toScale(availableSize, scaleMode, scaleFit);

    return {
      size: Size2.givenWidthHeight(this._width * scale, this._height * scale),
      scale,
    };
  }

  withAddedSize(other: Size2): Size2 {
    return Size2.givenWidthHeight(
      this._width + other.width,
      this._height + other.height
    );
  }

  withSubtractedSize(other: Size2): Size2 {
    return Size2.givenWidthHeight(
      this._width - other.width,
      this._height - other.height
    );
  }

  withScale(scale: number): Size2 {
    return Size2.givenWidthHeight(
      this._width * scale,
      this._height * scale
    );
  }
}
