"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
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
        return new Vector2(input * this._x, input * this._y);
    }
    withAddedVector(other) {
        return new Vector2(this._x + other._x, this._y + other._y);
    }
    withSubtractedVector(other) {
        return new Vector2(this._x - other._x, this._y - other._y);
    }
    toDotProduct(other) {
        return this._x * other._x + this._y * other._y;
    }
    toExteriorProduct(other) {
        return this.x * other.y - this.y * other.x;
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