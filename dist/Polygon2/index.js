"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon2 = void 0;
const __1 = require("..");
const Vector2_1 = require("../Vector2");
const svgPathStringGivenPolygon_1 = require("./_internal/svgPathStringGivenPolygon");
class Polygon2 {
    constructor(points) {
        this.withExpansion = (distance) => {
            const expanded = [];
            const rotationDirection = this.isClockwise
                ? "counterclockwise"
                : "clockwise";
            const points = this.points;
            const deg90 = __1.Rotation.givenDegrees(90);
            this.points.forEach((thisPoint, idx) => {
                // get this point (pt1), the point before it
                // (pt0) and the point that follows it (pt2)
                const prevPoint = points[idx > 0 ? idx - 1 : points.length - 1];
                const nextPoint = points[idx < points.length - 1 ? idx + 1 : 0];
                // find the line vectors of the lines going
                // into the current point
                const vectorA = Vector2_1.Vector2.givenPoints(prevPoint, thisPoint);
                const vectorB = Vector2_1.Vector2.givenPoints(thisPoint, nextPoint);
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
                const lineSegmentA = __1.Segment2.givenPoints(pointA, pointB);
                const lineSegmentB = __1.Segment2.givenPoints(pointC, pointD);
                const intersection = lineSegmentA.toOptionalIntersectionGivenSegment(lineSegmentB);
                if (intersection == null) {
                    throw new Error("Could not find line intersection");
                }
                expanded.push(intersection);
            });
            return Polygon2.givenPoints(expanded);
        };
        this.toSvgPathString = (cornerRadius = 0) => {
            return svgPathStringGivenPolygon_1.svgPathStringGivenPolygon(this, cornerRadius);
        };
        this.toBounds = () => {
            const allX = this.points.map((p) => p.x);
            const allY = this.points.map((p) => p.y);
            const minX = Math.min(...allX);
            const minY = Math.min(...allY);
            const maxX = Math.max(...allX);
            const maxY = Math.max(...allY);
            const topLeft = __1.Point2.givenXY(minX, minY);
            const bottomRight = __1.Point2.givenXY(maxX, maxY);
            return __1.Box2.givenOppositeCorners(topLeft, bottomRight);
        };
        this.points = points;
    }
    static ofEmpty() {
        return new Polygon2([]);
    }
    static givenPoints(points) {
        return new Polygon2(points);
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    get isClockwise() {
        if (this.points == null || this.points.length < 3) {
            return;
        }
        const p = this.points;
        return (Vector2_1.Vector2.givenPoints(p[0], p[1])
            .withRotation(__1.Rotation.givenDegrees(90), "clockwise")
            .toDotProduct(Vector2_1.Vector2.givenPoints(p[1], p[2])) >= 0);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Polygon2)) {
            return false;
        }
        if (this.points.length !== other.points.length) {
            return false;
        }
        return this.points.every((point, idx) => {
            return point.isEqual(other.points[idx]);
        });
    }
}
exports.Polygon2 = Polygon2;
//# sourceMappingURL=index.js.map