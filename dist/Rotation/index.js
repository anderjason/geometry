"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotation = void 0;
class Rotation {
    constructor(radians) {
        this.radians = radians;
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
//# sourceMappingURL=index.js.map