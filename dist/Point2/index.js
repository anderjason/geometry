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
    toClone() {
        return new Point2(this._x, this._y);
    }
    toDistance(other) {
        return this.toVector(other).toMagnitude();
    }
    toVector(other) {
        return Vector2_1.Vector2.givenXY(other.x - this.x, other.y - this.y);
    }
    withWeightedAverage(other, weight) {
        const t = weight.toNumber(1);
        const x = this.x + (other.x - this.x) * t;
        const y = this.y + (other.y - this.y) * t;
        return new Point2(x, y);
    }
    // withAngleDistance(angle: number, distance: number): Point2 {
    //   // Rotate the angle based on the browser coordinate system ([0,0] in the top left)
    //   const angleRotated = angle + Math.PI / 2;
    //   const x = this.x + Math.sin(angleRotated) * distance;
    //   const y = this.y - Math.cos(angleRotated) * distance;
    //   return new Point2(x, y);
    // }
    withAddedVector(vector) {
        return new Point2(this.x + vector.x, this.y + vector.y);
    }
    withSubtractedVector(vector) {
        return new Point2(this.x - vector.x, this.y - vector.y);
    }
}
exports.Point2 = Point2;
Point2._zero = new Point2(0, 0);
//# sourceMappingURL=index.js.map