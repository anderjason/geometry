"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSegment2 = void 0;
const Point2_1 = require("../Point2");
const Vector2_1 = require("../Vector2");
const util_1 = require("@anderjason/util");
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
    toClone() {
        return new LineSegment2(this._start.toClone(), this._end.toClone());
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
    toOptionalIntersection(other, mode) {
        // based on https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines
        // if the lines intersect, the result contains the x and y of the intersection
        // (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        let denominator;
        let a;
        let b;
        let numerator1;
        let numerator2;
        let x;
        let y;
        let onLine1;
        let onLine2;
        denominator =
            (other._end.y - other._start.y) * (this._end.x - this._start.x) -
                (other._end.x - other._start.x) * (this._end.y - this._start.y);
        if (denominator == 0) {
            return undefined;
        }
        a = this._start.y - other._start.y;
        b = this._start.x - other._start.x;
        numerator1 =
            (other._end.x - other._start.x) * a - (other._end.y - other._start.y) * b;
        numerator2 =
            (this._end.x - this._start.x) * a - (this._end.y - this._start.y) * b;
        a = numerator1 / denominator;
        b = numerator2 / denominator;
        // if we cast these lines infinitely in both directions, they intersect here:
        x = this._start.x + a * (this._end.x - this._start.x);
        y = this._start.y + a * (this._end.y - this._start.y);
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) {
            onLine1 = true;
        }
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) {
            onLine2 = true;
        }
        if (mode === "touch" && (onLine1 === false || onLine2 === false)) {
            return undefined;
        }
        if (mode === "extendOther" && onLine1 === false) {
            return undefined;
        }
        if (mode === "extendThis" && onLine2 === false) {
            return undefined;
        }
        return Point2_1.Point2.givenXY(x, y);
    }
    withAddedVector(vector) {
        return new LineSegment2(this._start.withAddedVector(vector), this._end.withAddedVector(vector));
    }
}
exports.LineSegment2 = LineSegment2;
//# sourceMappingURL=index.js.map