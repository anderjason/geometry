"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotation = void 0;
class Rotation {
    constructor(radians) {
        this._radians = radians;
    }
    static ofZero() {
        return new Rotation(0);
    }
    static ofFull() {
        return Rotation.givenDegrees(360);
    }
    static givenRadians(radians) {
        return new Rotation(radians);
    }
    static givenDegrees(degrees) {
        return new Rotation(degrees * (Math.PI / 180));
    }
    get isZero() {
        return this._radians === 0;
    }
    toRadians() {
        return this._radians;
    }
    toDegrees() {
        return (180 * this._radians) / Math.PI;
    }
}
exports.Rotation = Rotation;
//# sourceMappingURL=index.js.map