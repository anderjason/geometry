export class Rotation {
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
