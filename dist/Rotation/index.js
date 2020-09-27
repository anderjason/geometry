"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotation = void 0;
class Rotation {
    constructor(radians) {
        this.radians = radians;
    }
    static ofZero() {
        return this._zero;
    }
    static givenRadians(radians) {
        return new Rotation(radians);
    }
    static givenDegrees(degrees) {
        return new Rotation(degrees * (Math.PI / 180));
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
    get isZero() {
        return this.radians === 0;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Rotation)) {
            return false;
        }
        return other.radians === this.radians;
    }
    toDegrees() {
        return (180 * this.radians) / Math.PI;
    }
}
exports.Rotation = Rotation;
Rotation._zero = new Rotation(0);
//# sourceMappingURL=index.js.map