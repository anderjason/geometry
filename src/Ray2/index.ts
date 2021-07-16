import { Box2 } from "../Box2";
import { Point2 } from "../Point2";
import { Segment2 } from "../Segment2";
import { Vector2 } from "../Vector2";

export class Ray2 {
  readonly origin: Point2;
  readonly direction: Vector2;

  constructor(origin: Point2, direction: Vector2) {
    this.origin = origin;
    this.direction = direction.withNormalizedMagnitude();
  }

  toSegmentGivenBoundingBox(box: Box2): Segment2 {
    // TODO need a different technique to support really large or distant bounding boxes
    const largeSegment = Segment2.givenPoints(
      this.origin,
      this.origin.withAddedVector(this.direction.withMultipliedScalar(1000000))
    );

    const clipped = largeSegment.withClippingBox(box);
    return clipped;
  }

  toDistanceGivenBox(box: Box2): number {
    if (box.isPointInside(this.origin)) {
      return 0;
    }

    // Based on code from https://github.com/stackgl/ray-aabb-intersection
    // TODO cleanup

    const dims = 2;
    let lo = -Infinity;
    let hi = +Infinity;

    const aabb = [
      [box.toLeft(), box.toTop()],
      [box.toRight(), box.toBottom()],
    ];

    const ro = [this.origin.x, this.origin.y];

    const rd = [this.direction.x, this.direction.y];

    for (let i = 0; i < dims; i++) {
      let dimLo = (aabb[0][i] - ro[i]) / rd[i];
      let dimHi = (aabb[1][i] - ro[i]) / rd[i];

      if (dimLo > dimHi) {
        const tmp = dimLo;
        dimLo = dimHi;
        dimHi = tmp;
      }

      if (dimHi < lo || dimLo > hi) {
        return undefined;
      }

      if (dimLo > lo) {
        lo = dimLo;
      }

      if (dimHi < hi) {
        hi = dimHi;
      }
    }

    if (lo < 0) {
      return undefined;
    }

    if (lo > hi) {
      return undefined;
    }

    return lo;
  }
}
