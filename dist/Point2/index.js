"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2 = void 0;
const Vector2_1 = require("../Vector2");
class Point2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    static givenXY(x, y) {
        return new Point2(x, y);
    }
    static ofZero() {
        return this._zero;
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
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get isZero() {
        return this._x === 0 && this._y === 0;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Point2)) {
            return false;
        }
        return other._x == this._x && other._y == this._y;
    }
    toDistance(other) {
        return this.toVector(other).toMagnitude();
    }
    toVector(other) {
        return Vector2_1.Vector2.givenXY(other.x - this.x, other.y - this.y);
    }
    withAddedVector(vector) {
        return new Point2(this.x + vector.x, this.y + vector.y);
    }
    withSubtractedVector(vector) {
        return new Point2(this.x - vector.x, this.y - vector.y);
    }
    withRotationAroundPoint(rotation, center) {
        return Point2.givenXY(Math.cos(rotation.radians) * (this.x - center.x) -
            Math.sin(rotation.radians) * (this.y - center.y) +
            center.x, Math.sin(rotation.radians) * (this.x - center.x) +
            Math.cos(rotation.radians) * (this.y - center.y) +
            center.y);
    }
}
exports.Point2 = Point2;
Point2._zero = new Point2(0, 0);
//# sourceMappingURL=index.js.map