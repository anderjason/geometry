import { Point2, Rotation, LineSegment2, Box2 } from "..";
import { Vector2, RotationDirection } from "../Vector2";
import { svgPathStringGivenPolygon } from "./_internal/svgPathStringGivenPolygon";

export class Polygon2 {
  readonly points: Point2[];

  static ofEmpty() {
    return new Polygon2([]);
  }

  static givenPoints(points: Point2[]) {
    return new Polygon2(points);
  }

  private constructor(points: Point2[]) {
    this.points = points;
  }

  get isClockwise() {
    if (this.points == null || this.points.length < 3) {
      return;
    }

    const p = this.points;

    return (
      Vector2.givenPoints(p[0], p[1])
        .withRotation(Rotation.givenDegrees(90), "clockwise")
        .toDotProduct(Vector2.givenPoints(p[1], p[2])) >= 0
    );
  }

  withExpansion = (distance: number): Polygon2 => {
    const expanded: Point2[] = [];
    const rotationDirection: RotationDirection = this.isClockwise
      ? "counterclockwise"
      : "clockwise";

    const points = this.points;

    const deg90 = Rotation.givenDegrees(90);

    this.points.forEach((thisPoint, idx) => {
      // get this point (pt1), the point before it
      // (pt0) and the point that follows it (pt2)
      const prevPoint = points[idx > 0 ? idx - 1 : points.length - 1];
      const nextPoint = points[idx < points.length - 1 ? idx + 1 : 0];

      // find the line vectors of the lines going
      // into the current point
      const vectorA = Vector2.givenPoints(prevPoint, thisPoint);
      const vectorB = Vector2.givenPoints(thisPoint, nextPoint);

      // find the normals of the two lines, multiplied
      // to the distance that polygon should inflate
      const vectorC = vectorA
        .withRotation(deg90, rotationDirection)
        .withNormalizedMagnitude()
        .withMultipliedScalar(distance);

      const vectorD = vectorB
        .withRotation(deg90, rotationDirection)
        .withNormalizedMagnitude()
        .withMultipliedScalar(distance);

      // use the normals to find two points on the
      // lines parallel to the polygon lines
      const pointA = prevPoint.withAddedVector(vectorC);
      const pointB = thisPoint.withAddedVector(vectorC);
      const pointC = thisPoint.withAddedVector(vectorD);
      const pointD = nextPoint.withAddedVector(vectorD);

      // find the intersection of the two lines, and
      // add it to the expanded polygon
      const lineSegmentA = LineSegment2.givenPoints(pointA, pointB);
      const lineSegmentB = LineSegment2.givenPoints(pointC, pointD);

      const intersection = lineSegmentA.toOptionalIntersectionGivenSegment(
        lineSegmentB
      );
      if (intersection == null) {
        throw new Error("Could not find line intersection");
      }

      expanded.push(intersection);
    });

    return Polygon2.givenPoints(expanded);
  };

  toSvgPathString = (cornerRadius: number = 0): string => {
    return svgPathStringGivenPolygon(this, cornerRadius);
  };

  toBounds = () => {
    const allX = this.points.map((p) => p.x);
    const allY = this.points.map((p) => p.y);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);

    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);

    const topLeft = Point2.givenXY(minX, minY);
    const bottomRight = Point2.givenXY(maxX, maxY);

    return Box2.givenOppositeCorners(topLeft, bottomRight);
  };
}
