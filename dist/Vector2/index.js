"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
const Point2_1 = require("../Point2");
const Rotation_1 = require("../Rotation");
class Vector2 {
    constructor(x, y) {
        this.isEqual = (other) => {
            if (other == null) {
                return false;
            }
            if (!(other instanceof Vector2)) {
                return false;
            }
            return this._x === other._x && this._y === other._y;
        };
        this._x = x;
        this._y = y;
    }
    static givenXY(x, y) {
        return new Vector2(x, y);
    }
    static givenPoint(point) {
        return new Vector2(point.x, point.y);
    }
    static givenPoints(startPoint, endPoint) {
        return startPoint.toVector(endPoint);
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
    withMultipliedScalar(input) {
        return new Vector2(this._x * input, this._y * input);
    }
    withDividedScalar(input) {
        return new Vector2(this._x / input, this._y / input);
    }
    withAddedVector(other) {
        return new Vector2(this._x + other._x, this._y + other._y);
    }
    withSubtractedVector(other) {
        return new Vector2(this._x - other._x, this._y - other._y);
    }
    withMultipliedVector(other) {
        return new Vector2(this._x * other._x, this._y * other._y);
    }
    withDividedVector(other) {
        return new Vector2(this._x / other._x, this._y / other._y);
    }
    toPoint() {
        return Point2_1.Point2.givenXY(this.x, this.y);
    }
    toDotProduct(other) {
        return this._x * other._x + this._y * other._y;
    }
    toCrossProduct(other) {
        return this.x * other.y - this.y * other.x;
    }
    toMagnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
    toAngle(other) {
        // this always returns a rotation between 0 and PI because
        // two vectors cannot point more away from each other than directly
        // away from each other, which can always be achieved by a rotation
        // of PI radians (180 degrees)
        const dot = this.toDotProduct(other);
        const magnitude = this.toMagnitude() * other.toMagnitude();
        return Rotation_1.Rotation.givenRadians(Math.acos(dot / magnitude));
    }
    withNormalizedMagnitude() {
        return this.withDividedScalar(this.toMagnitude());
    }
    withReversedDirection() {
        return new Vector2(-this._x, -this._y);
    }
    withRotation(rotation, direction) {
        let rad = rotation.radians;
        if (direction === "clockwise") {
            rad *= -1;
        }
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const ox = this.x;
        const oy = this.y;
        return new Vector2(ox * cos - oy * sin, ox * sin + oy * cos);
    }
    withPerpendicularDirection(rotation) {
        if (rotation === "clockwise") {
            return new Vector2(this.y, -this.x);
        }
        else {
            return new Vector2(-this.y, this.x);
        }
    }
    withWeightedAverage(other, weight) {
        const t = weight.toNumber(1);
        const x1 = this.withMultipliedScalar(1 - t);
        const y1 = other.withMultipliedScalar(t);
        return x1.withAddedVector(y1);
    }
}
exports.Vector2 = Vector2;
//# sourceMappingURL=index.js.map