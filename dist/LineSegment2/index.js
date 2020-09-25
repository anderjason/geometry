"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSegment2 = void 0;
const Point2_1 = require("../Point2");
const Vector2_1 = require("../Vector2");
const util_1 = require("@anderjason/util");
const optionalLineIntersectionGivenPoints_1 = require("../Line2/optionalLineIntersectionGivenPoints");
const half = util_1.Percent.givenFraction(1, 2);
class LineSegment2 {
    constructor(a, b) {
        this._start = a;
        this._end = b;
    }
    static givenXYPair(x1, y1, x2, y2) {
        return new LineSegment2(Point2_1.Point2.givenXY(x1, y1), Point2_1.Point2.givenXY(x2, y2));
    }
    static givenPoints(startPoint, endPoint) {
        return new LineSegment2(startPoint, endPoint);
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
    get startPoint() {
        return this._start;
    }
    get endPoint() {
        return this._end;
    }
    get startX() {
        return this._start.x;
    }
    get endX() {
        return this._end.x;
    }
    get startY() {
        return this._start.y;
    }
    get endY() {
        return this._end.y;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof LineSegment2)) {
            return false;
        }
        return other._start.isEqual(this._start) && other._end.isEqual(this._end);
    }
    toLength() {
        return this._start.toDistance(this._end);
    }
    toNearestPoint(point, infinite) {
        const pnt = Vector2_1.Vector2.givenXY(point.x, point.y);
        if (infinite) {
            const linePnt = Vector2_1.Vector2.givenXY(this._start.x, this._start.y);
            const lineDir = Vector2_1.Vector2.givenPoints(this._start, this._end).withNormalizedMagnitude();
            const v = pnt.withSubtractedVector(linePnt);
            const d = v.toDotProduct(lineDir);
            return linePnt.withAddedVector(lineDir.withMultipliedScalar(d)).toPoint();
        }
        else {
            let line = Vector2_1.Vector2.givenPoints(this._start, this._end);
            const len = line.toMagnitude();
            line = line.withNormalizedMagnitude();
            const startVector = Vector2_1.Vector2.givenPoint(this._start);
            const v = pnt.withSubtractedVector(startVector);
            let d = v.toDotProduct(line);
            d = util_1.NumberUtil.numberWithHardLimit(d, 0, len);
            return startVector
                .withAddedVector(line.withMultipliedScalar(d))
                .toPoint();
        }
    }
    toMidpoint() {
        return this.toIntermediatePoint(half);
    }
    toIntermediatePoint(percent) {
        return this.startPoint.withAddedVector(Vector2_1.Vector2.givenPoints(this.startPoint, this.endPoint).withMultipliedScalar(percent.toNumber(1)));
    }
    toOptionalIntersectionGivenLine(other) {
        return other.toOptionalIntersectionGivenSegment(this);
    }
    toOptionalIntersectionGivenSegment(other) {
        const startA = this.startPoint;
        const endA = this.endPoint;
        const startB = other.startPoint;
        const endB = other.endPoint;
        return optionalLineIntersectionGivenPoints_1.optionalLineIntersectionGivenPoints(startA, endA, startB, endB, "touch");
    }
    withAddedVector(vector) {
        return new LineSegment2(this._start.withAddedVector(vector), this._end.withAddedVector(vector));
    }
}
exports.LineSegment2 = LineSegment2;
//# sourceMappingURL=index.js.map