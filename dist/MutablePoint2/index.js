"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutablePoint2 = void 0;
const Point2_1 = require("../Point2");
class MutablePoint2 extends Point2_1.Point2 {
    static givenXY(x, y) {
        return new MutablePoint2(x, y);
    }
    static givenPoint2(point) {
        return new MutablePoint2(point.x, point.y);
    }
    static ofZero() {
        return new MutablePoint2(0, 0);
    }
    constructor(x, y) {
        super(x, y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    toClone() {
        return new MutablePoint2(this._x, this._y);
    }
}
exports.MutablePoint2 = MutablePoint2;
//# sourceMappingURL=index.js.map