"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutablePoint3 = void 0;
const Point3_1 = require("../Point3");
class MutablePoint3 extends Point3_1.Point3 {
    static givenXYZ(x, y, z) {
        return new MutablePoint3(x, y, z);
    }
    static givenPoint3(point) {
        return new MutablePoint3(point.x, point.y, point.z);
    }
    static ofZero() {
        return new MutablePoint3(0, 0, 0);
    }
    constructor(x, y, z) {
        super(x, y, z);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    set z(value) {
        this._z = value;
    }
    toClone() {
        return new MutablePoint3(this._x, this._y, this._z);
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return other._x == this._x && other._y == this._y && other._z == this._z;
    }
}
exports.MutablePoint3 = MutablePoint3;
//# sourceMappingURL=index.js.map