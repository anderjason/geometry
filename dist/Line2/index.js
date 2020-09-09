"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line2 = void 0;
const Vector2_1 = require("../Vector2");
const optionalLineIntersectionGivenPoints_1 = require("./optionalLineIntersectionGivenPoints");
class Line2 {
    constructor(vector, point) {
        this._vector = vector.withNormalizedMagnitude();
        this._point = point;
    }
    static givenVectorAndPoint(vector, point) {
        return new Line2(vector, point);
    }
    static givenPoints(a, b) {
        const vector = a.toVector(b);
        return new Line2(vector, a);
    }
    static givenLineSegment(lineSegment) {
        return Line2.givenPoints(lineSegment.startPoint, lineSegment.endPoint);
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
    get vector() {
        return this._vector;
    }
    get point() {
        return this._point;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Line2)) {
            return false;
        }
        return other.vector.isEqual(this.vector) && other.point.isEqual(this.point);
    }
    toClone() {
        return new Line2(this._vector.toClone(), this._point.toClone());
    }
    toNearestTouchingPoint(point) {
        const pnt = Vector2_1.Vector2.givenXY(point.x, point.y);
        const linePnt = Vector2_1.Vector2.givenXY(this._point.x, this._point.y);
        const v = pnt.withSubtractedVector(linePnt);
        const d = v.toDotProduct(this._vector);
        return linePnt
            .withAddedVector(this._vector.withMultipliedScalar(d))
            .toPoint();
    }
    toOptionalIntersectionGivenSegment(other) {
        const startA = this.point;
        const endA = this.point.withAddedVector(this.vector);
        const startB = other.startPoint;
        const endB = other.endPoint;
        return optionalLineIntersectionGivenPoints_1.optionalLineIntersectionGivenPoints(startA, endA, startB, endB, "extendThis");
    }
    toOptionalIntersectionGivenLine(other) {
        const startA = this.point;
        const endA = this.point.withAddedVector(this.vector);
        const startB = other.point;
        const endB = other.point.withAddedVector(other.vector);
        return optionalLineIntersectionGivenPoints_1.optionalLineIntersectionGivenPoints(startA, endA, startB, endB, "extendBoth");
    }
    withIntercept(intercept) {
        return new Line2(this._vector, intercept);
    }
    withVector(vector) {
        return new Line2(vector, this._point);
    }
}
exports.Line2 = Line2;
//# sourceMappingURL=index.js.map