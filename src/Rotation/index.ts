export class Rotation {
  static ofZero(): Rotation {
    return new Rotation(0);
  }

  static ofFull(): Rotation {
    return Rotation.givenDegrees(360);
  }

  static givenRadians(radians: number): Rotation {
    return new Rotation(radians);
  }

  static givenDegrees(degrees: number): Rotation {
    return new Rotation(degrees * (Math.PI / 180));
  }

  private _radians: number;

  private constructor(radians: number) {
    this._radians = radians;
  }

  get isZero(): boolean {
    return this._radians === 0;
  }

  toRadians(): number {
    return this._radians;
  }

  toDegrees(): number {
    return (180 * this._radians) / Math.PI;
  }
}
