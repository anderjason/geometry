export class Rotation {
  private static _zero = new Rotation(0);

  static ofZero(): Rotation {
    return this._zero;
  }
  static givenRadians(radians: number): Rotation {
    return new Rotation(radians);
  }

  static givenDegrees(degrees: number): Rotation {
    return new Rotation(degrees * (Math.PI / 180));
  }

  static isEqual(a: Rotation, b: Rotation): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  readonly radians: number;

  private constructor(radians: number) {
    this.radians = radians;
  }

  get isZero(): boolean {
    return this.radians === 0;
  }

  isEqual(other: Rotation): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Rotation)) {
      return false;
    }

    return other.radians === this.radians;
  }

  toDegrees(): number {
    return (180 * this.radians) / Math.PI;
  }
}
